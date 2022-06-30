import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
//import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    private async generateToken(userDto: CreateUserDto) {
        const payload = {email: userDto.email, id: userDto.id, role: userDto.role}; // !!!тут одна роль!!!
        const tokenjwt = await this.jwtService.signAsync(payload);
        return `Authentication=${tokenjwt}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`; //tokenjwt;
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        if(!user){
          throw new UnauthorizedException({message: 'Пользователя с таким логином не существует!'})
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (!passwordEquals) {
          throw new UnauthorizedException({message: 'Неверный пароль!'});
        }
        return user;
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if (candidate) {
            throw new HttpException('Пользователь с таким логином существует!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword});
        return true;//this.generateToken(user)
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
        // мы видимо должны отдать токен клиенту чтобы он потом при заходе куда либо давал нам его
    }

    /*
    async checkGuard(userDto: CreateUserDto, token: string) {
        const userdb = await this.userService.getUserByLogin(userDto.login);
        const jwt = this.generateToken(userdb);
        console.log(token);
        console.log(jwt);

        return true;
    }
    */

}
