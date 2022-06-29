import {Body, Controller, Post, Get} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller()
export class AuthController {

  constructor( private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
    // Поменять вывод что тут(вместо return другое)
  }
  
  //@UseGuards(JwtAuthGuard)
  //@Roles("user") // работает если писать большими и тут нужно сделать доступ только !!! НЕ АВТОРИЗОВАННЫМ !!!
  //@UseGuards(RolesGuard)
  //@Get("/login")
  //

  @Post('/register')
  registration(@Res res, @Body() userDto: CreateUserDto) {
    if(this.authService.registration(userDto) == true){
      res.redirect('/login');
    }else{
      return
      // как пример, но по итогу(он не может отправить false(там внутри обрабатываются ошибки). Нам наверно надо
      // отправлять message с тем что не удалось по той то причине зарегаться, вместо HttpException)
    }
    // Поменять вывод что тут(вместо return другое)

  }
  //@Get("/registration")
  //


}
