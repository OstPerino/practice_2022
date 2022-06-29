import { Controller, Post, Get, Body, Res, UseGuards} from '@nestjs/common';
import {Response} from "express";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Roles} from "./auth/roles-auth.decorator";
import {RolesGuard} from "./auth/roles.guard";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(@Res() res: Response) {
    res.redirect('/login');
  }

  @Roles('user','admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("/main")
  mainPage() {
    return "This is Main Page";
    //
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("/other")
  otherPage() {
    return "This is Other Page";
    //
  }

}
