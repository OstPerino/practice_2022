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
        console.log(typeof req.headers.cookie);
        console.log(req.headers.cookie);

        try {
            const authHeader = req.headers.cookie;// возможно надо будет просто вытащить cookie и уже их verify
            const moreCookie = authHeader.split('; ');
            let myToken: string;
            for (let i = 0; i < moreCookie.length; i++) {
              const nameToken = moreCookie[i].split('=')[0];
              if(nameToken === 'Authentication'){
                myToken = moreCookie[i];
                console.log('Found -> ' + myToken);
                break;
              }
            }

            if(!authHeader){
              console.log('not cookie');
              // throw new UnauthorizedException({'message': 'Пользователь не авторизован(нет куки)'});
              return false;
            }
            const nameToken = myToken.split('=')[0]
            const token = myToken.split('=')[1]
            console.log('TOKEN = ' + token);


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

            req.user = user;
            console.log('User from req:');
            console.log(req.user);
            return true;
        } catch (e) {
          console.log(e);
            throw new UnauthorizedException({'message': 'Ошибка в выполнении!'});
        }
    }

}
