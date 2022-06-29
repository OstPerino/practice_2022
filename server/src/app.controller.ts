import { Controller, Post, Body, Res} from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(@Res res) {
    res.redirect('/login');
  }

  @Get("/main")
  mainPage() {
    return "This is Main Page";
    //
  }

  @Get("/other")
  mainPage() {
    return "This is Other Page";
    //
  }

}
