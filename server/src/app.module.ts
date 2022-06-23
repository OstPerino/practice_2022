import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./prisma/prisma.service";
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PrismaService, PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
