import { Controller, Post, Get, Req, Res, UseGuards} from '@nestjs/common';
import {Response, Request} from "express";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Roles} from "./auth/roles-auth.decorator";
import {RolesGuard} from "./auth/roles.guard";

@Controller()
export class AppController {
  constructor() {}

  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get("/other")
  otherPage(@Res() res: Response) {
    // return "This is Other Page";
    res.status(200).end();
  }

}
