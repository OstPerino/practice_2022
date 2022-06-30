import { Controller, Post, Get, Body, Res, UseGuards} from '@nestjs/common';
import {Response} from "express";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Roles} from "./auth/roles-auth.decorator";
import {RolesGuard} from "./auth/roles.guard";

@Controller()
export class AppController {
  constructor() {}

  @Roles('user','admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("/main")
  mainPage(@Res() res: Response) {
    // return "This is Main Page";
    res.status(200).end();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("/other")
  otherPage(@Res() res: Response) {
    // return "This is Other Page";
    res.status(200).end();
  }

}
