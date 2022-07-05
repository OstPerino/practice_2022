import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {Login} from "./dto/login-auth.dto";
//import {User} from "../user/entities/user.entity"
import { User } from '@prisma/client';

import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {

    constructor(private configService: ConfigService,
                private userService: UserService,
                private jwtService: JwtService) {}

    private async generateToken(userDto: User): Promise<string> {
        const payload = {login: userDto.login, id: userDto.id, role: userDto.role}; // !!!тут одна роль!!!
        const tokenjwt = await this.jwtService.signAsync(payload);
        // TODO: env заменить ConfigService
        return `Authentication=${tokenjwt}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>('JWT_EXPIRATION_TIME')}`;//process.env.JWT_EXPIRATION_TIME
    }

    private async validateUser(userAuth: Login): Promise<User> {
        const user = await this.userService.getUserByLogin(userAuth.login);
        if(!user){
          throw new UnauthorizedException({message: 'Пользователя с таким логином не существует!'})
        }
        const passwordEquals = await bcrypt.compare(userAuth.password, user.password);
        if (!passwordEquals) {
          throw new UnauthorizedException({message: 'Неверный пароль!'});
        }
        return user;
    }

    async registration(userDto: CreateUserDto): Promise<User> {
        const userdb = await this.userService.getUserByLogin(userDto.login);
        if (userdb) {
            throw new HttpException('Пользователь с таким логином существует!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hashPassword});
        return user;
    }

    async login(userDto: Login): Promise<string> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
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
