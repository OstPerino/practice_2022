import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from  '../auth/auth.module';
import {StatTaskModule} from "../stat-task/stat-task.module";

import {UserModule} from "../user/user.module";
//import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [UserModule, AuthModule, PrismaService, StatTaskModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
