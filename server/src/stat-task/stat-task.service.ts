import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatTask, Task, Prisma } from '@prisma/client';

@Injectable()
export class StatTaskService {
  constructor(private prisma: PrismaService) {}

  async getStatsTask(task: Task, lastTime: number, presentTime: number): Promise<StatTask[]> {
    try {
      let stats = await this.prisma.statTask.findMany({
        where: { id: task.id , stop_time: { gte: lastTime, lte: presentTime } },
      });
      if (!stats) {
        throw new HttpException(
          'Не удалось получить статистику задачи!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return stats;
    } catch (error) {
      console.log(error);
    }
  }

  //async create statTask(stat: StatTask): Promise<StatTask> {

  //}
}
