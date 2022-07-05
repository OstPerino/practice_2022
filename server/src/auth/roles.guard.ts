import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
              console.log('roles is null');
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.cookie;
            const moreCookie = authHeader.split('; ');
            let myToken: string;
            for (let i = 0; i < moreCookie.length; i++) {
              const nameToken = moreCookie[i].split('=')[0];
              if(nameToken === 'Authentication'){
                myToken = moreCookie[i];
                console.log('!VOV!  ' + myToken);
                break;
              }
            }

            const nameToken = myToken.split('=')[0]
            const token = myToken.split('=')[1]

            if (nameToken !== 'Authentication' && !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован(Roles)'})
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            console.log(user.role);
            console.log(requiredRoles);
            console.log('_role_');
            const result = requiredRoles.some(role => user.role == role);
            console.log(result);
            return result;
            //return user.role.some(role => requiredRoles.includes(role.value)); // ??user.roles or user.role??
        } catch (e) {
            // TODO: Не возвращает boolean

            console.log(e)
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

}
