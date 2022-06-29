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
            const nameToken = authHeader.split('=')[0]
            const token = authHeader.split('=')[1]

            if (nameToken !== 'jwt' || !token) {
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
            console.log(e)
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

}
