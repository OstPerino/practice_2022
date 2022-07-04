import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private userService: UserService,
                private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        console.log(req.headers.cookie);

        try {
            const authHeader = req.headers.cookie;// возможно надо будет просто вытащить cookie и уже их verify
            if(!authHeader){
              console.log('not cookie');
              // throw new UnauthorizedException({'message': 'Пользователь не авторизован(нет куки)'});
              return false;
            }
            const nameToken = authHeader.split('=')[0]
            const token = authHeader.split('=')[1]

            if (nameToken !== 'Authentication' && !token) {
                //throw new UnauthorizedException({'message': 'Пользователь не авторизован(нет jwt токена)'});
                return false;
            }

            const user = this.jwtService.verify(token);
            //const userdb =

            //this.userService.getUserByLogin(user.login).then((result) => {console.log('Result:');console.log(result);});

            console.log('User:');
            console.log(user);

            ////console.log('User DATABASE:');
            ////console.log(userdb);

            //req.user = user;
            //console.log('User from req:');
            //console.log(req.user);
            return true;
        } catch (e) {
          console.log(e);
            throw new UnauthorizedException({'message': 'Ошибка в выполнении!'});
        }
    }

}
