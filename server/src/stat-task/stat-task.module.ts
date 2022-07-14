import { Module } from '@nestjs/common';
import { StatTaskService } from './stat-task.service';
import { StatTaskController } from './stat-task.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [StatTaskService, PrismaService],
  controllers: [StatTaskController],
  exports: [StatTaskService]
})
export class StatTaskModule {}
