import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Login } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { JwtNoAuthGuard } from './jwt-no_auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userAuth: Login,
  ) {
    const jwtToken = await this.authService.login(userAuth);
    //res.cookie('jwt', jwtToken, {httpOnly: true});
    res.setHeader('Set-Cookie', jwtToken);
    res.status(200).end();
  }

  //@UseGuards(JwtNoAuthGuard)
  //@UseGuards(JwtAuthGuard)
  //@Roles("user") // работает ли если писать большими и тут нужно сделать доступ только !!! НЕ АВТОРИЗОВАННЫМ !!!
  //@UseGuards(RolesGuard)

  @UseGuards(JwtAuthGuard)
  @Get('/login')
  async logPage(@Res() res: Response) {
    res.status(200).end();
  }

  @Post('/register')
  async registration(@Res() res: Response, @Body() userDto: CreateUserDto) {
    const user = await this.authService.registration(userDto);
    if (!user) {
      res.status(400).end();
    }
    res.status(200).send(user);
  }

  @UseGuards(JwtNoAuthGuard)
  @Get('/register')
  async regPage(@Res() res: Response) {
    res.status(200).end();
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    console.log('Delete authorization token');
    res.clearCookie('Authentication');
    res.status(200).end();
  }
}
