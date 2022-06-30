import {Body, Controller, Post, Get, Delete, Res, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
//import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtNoAuthGuard} from "./jwt-no_auth.guard";
import {Response} from "express";

@Controller()
export class AuthController {

  constructor( private authService: AuthService) {}

  // @Get('/checkLogin')
  // async checkLogin() {
  //
  // }

  @Post('/login')
  async login(@Res({passthrough: true}) res: Response, @Body() userDto: CreateUserDto) {
    const jwtToken = await this.authService.login(userDto);
    //res.cookie('jwt', jwtToken, {httpOnly: true});
    res.setHeader('Set-Cookie', jwtToken);
    res.status(200).end();//.send( {message: 'Authentication(token generate)'} );
  }

  //@UseGuards(JwtNoAuthGuard)
  //@UseGuards(JwtAuthGuard)
  //@Roles("user") // работает ли если писать большими и тут нужно сделать доступ только !!! НЕ АВТОРИЗОВАННЫМ !!!
  //@UseGuards(RolesGuard)

  @UseGuards(JwtNoAuthGuard)
  @Get('/isAuth')
  async logPage(@Res() res: Response){
    res.status(200).end();
  }


  // TODO: Странная запись, не возвращается пользовать
  @Post('/register')
  async registration(@Res() res: Response, @Body() userDto: CreateUserDto) {
    if(Boolean(await this.authService.registration(userDto)) == true){
      res.status(200).end();
      //res.redirect('/login');
    }
    res.status(400).end();
  }

  @UseGuards(JwtNoAuthGuard)
  @Get('/register')
  async regPage(@Res() res: Response){
    res.status(200).end();
  }

  @Get('/logout')
  async logout(@Res({passthrough: true}) res: Response){
    console.log('Delete authorization token');
    res.clearCookie('Authentication');
    res.status(200).end();
  }


}
