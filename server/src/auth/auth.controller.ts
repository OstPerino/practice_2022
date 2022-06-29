import {Body, Controller, Post, Get, Delete, Res, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
//import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtNoAuthGuard} from "./jwt-no_auth.guard";
import {Response} from "express";

@Controller()
export class AuthController {

  constructor( private authService: AuthService) {}

  @Post('/login')
  async login(@Res({passthrough: true}) res: Response, @Body() userDto: CreateUserDto) {
    const jwtToken = await this.authService.login(userDto);
    res.cookie('jwt', jwtToken, {httpOnly: true});
    //res.redirect('/main');
    return {message: 'token generate' };
    // Поменять вывод что тут(вместо return другое)
  }

  //@UseGuards(JwtNoAuthGuard)
  //@UseGuards(JwtAuthGuard)
  //@Roles("user") // работает ли если писать большими и тут нужно сделать доступ только !!! НЕ АВТОРИЗОВАННЫМ !!!
  //@UseGuards(RolesGuard)

  @UseGuards(JwtNoAuthGuard)
  @Get('/login')
  async logPage(){
    return { message: 'This is logPage!' };
  }

  @Post('/register')
  async registration(@Res() res: Response, @Body() userDto: CreateUserDto) {
    if(Boolean(await this.authService.registration(userDto)) == true){

      res.redirect('/login');
    }else{
      return {registration: false}
      // как пример, но по итогу(он не может отправить false(там внутри обрабатываются ошибки). Нам наверно надо
      // отправлять message с тем что не удалось по той то причине зарегаться, вместо HttpException)
    }
    // Поменять вывод что тут(вместо return другое)
  }

  @UseGuards(JwtNoAuthGuard)
  @Get('/register')
  async regPage(){
    return {message: 'This is register Page!'};
  }

  @Delete('/logout')
  async logout(@Res({passthrough: true}) res: Response){
    res.clearCookie('jwt');
    return { message: 'jwt token delete!' }
  }


}
