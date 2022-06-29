import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }


        //        ПРОБЛЕМА С ОБРАБОТКОЙ ИСКЛЮЧЕНИЙ



    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.cookie;// возможно надо будет просто вытащить cookie и уже их verify
            if(!authHeader){
              console.log('not cookie');
              throw new UnauthorizedException({'message': 'Пользователь не авторизован(нет куки)'});
            }
            const nameToken = authHeader.split('=')[0]
            const token = authHeader.split('=')[1]

            if (nameToken !== 'jwt' && !token) {
                throw new UnauthorizedException({'message': 'Пользователь не авторизован(нет jwt токена)'});
            }

            const user = this.jwtService.verify(token);
            console.log('User:');
            console.log(user);
            //req.user = user;
            return true;
        } catch (e) {
          console.log(e);
            throw new UnauthorizedException({'message': 'Ошибка в выполнении!'});
        }
    }

}
