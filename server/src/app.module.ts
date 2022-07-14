import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { StatTaskModule } from './stat-task/stat-task.module';

@Module({
  imports: [
    UserModule,
    PrismaService,
    AuthModule,
    TasksModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '...env' }),
    StatTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
