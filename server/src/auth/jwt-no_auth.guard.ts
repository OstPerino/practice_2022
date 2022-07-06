import {CanActivate, ExecutionContext, Injectable, BadRequestException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtNoAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        console.log("---NO AUTH GUARD---");
        console.log('COOKIE -> ' + req.headers.cookie);

        try {
            const authHeader = req.headers.cookie; //authorization
            if(authHeader){
              //return true;
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
              if(!myToken){
                return true;
              }
              const nameToken = myToken.split('=')[0]
              const token = myToken.split('=')[1]

              console.log('nameToken = ' + nameToken);
              console.log('token = ' + token);

              if (nameToken == 'Authentication' && token) {
                console.log('Авторизованный пользователь!');
                // throw new BadRequestException({message: 'Пользователь авторизован'})
                return false;
              }
            }
            //req.user = user;
            return true;
        } catch (e) {
//return false
            // TODO: Не возвращает boolean
          console.log(e);
            throw new BadRequestException({message: 'Ошибка при обработке!'})
        }
    }

}
