import {CanActivate, ExecutionContext, Injectable, BadRequestException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class JwtNoAuthGuard implements CanActivate {
    constructor(private userService: UserService,
                private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        console.log(req.headers.cookie);

        try {
            const authHeader = req.headers.cookie; //authorization
            if(!authHeader){
              return true;
            }
            const nameToken = authHeader.split('=')[0]
            const token = authHeader.split('=')[1]

            console.log('nameToken = ' + nameToken);
            console.log('token = ' + token);

            if (nameToken !== 'Authentication' && !token) {
              return true;
            }
            const user = this.jwtService.verify(token); // verifyAsync
            //const userdb = this.userService.getUserByLogin(user.login);//this.authService.checkGuard(user, token);

            console.log(user);
            //console.log(userdb);

            console.log('Авторизованный пользователь!');
              // throw new BadRequestException({message: 'Пользователь авторизован'})

            //req.user = user;
            return false;
        } catch (e) {
          console.log(e);
            throw new BadRequestException({message: 'Ошибка при обработке!'})
        }
    }

}
