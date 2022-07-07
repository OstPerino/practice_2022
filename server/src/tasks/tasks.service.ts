import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async tasks(authorID: number): Promise<Task[] | null> {
    // у нас может и не быть задач
    try {
      const tasks = await this.prisma.task.findMany({ where: { authorId: authorID } });
      tasks.forEach(task => {
        if(task.status === true){
          const time = new Date();
          const presentTime = Math.round(time.getTime()/1000.0);
          task.time += presentTime;
        }
      });
      return tasks;
    } catch (error) {
      console.log(error);
    }
  }

  async createTask(dataTask: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.prisma.task.create({ data: { ...dataTask } });
      if (!task) {
        throw new HttpException(
          'Не удалось создать задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async task(authorID: number, taskID: string): Promise<Task> {
    try {
      const task = await this.prisma.task.findFirst({
        where: { id: Number(taskID), authorId: authorID },
      });
      if (!task) {
        throw new HttpException(
          'Не удалось получить задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(dataTask: UpdateTaskDto, id: string): Promise<Task> {
    try {
      const task = await this.prisma.task.update({
        data: { ...dataTask },
        where: { id: Number(id) },
      });
      if (!task) {
        throw new HttpException(
          'Не удалось обновить задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(idTask: string): Promise<Task> {
    try {
      const task = await this.prisma.task.delete({
        where: { id: Number(idTask) },
      });
      if (!task) {
        throw new HttpException(
          'Не удалось удалить задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async startTaskTimer(id: string): Promise<Task> {
    try {
      const task = await this.prisma.task.findFirst({
        where: { id: Number(id) },
      });
      if (!task) {
        throw new HttpException(
          'Не удалось получить задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!task.status) {
        task.status = true;
        const time = new Date();
        const startTime = Math.round(time.getTime()/1000.0);
        task.start_time = startTime;
        console.log('start_time -> ' + task.start_time + '; time -> ' + task.time);
        const updTask = await this.prisma.task.update({
          data: { ...task },
          where: { id: Number(id) },
        });
        if (!updTask) {
          throw new HttpException(
            'Не удалось обновить запуск задачи!',
            HttpStatus.BAD_REQUEST,
          );
        }
        return updTask;
      }
      throw new HttpException(
        'Задача уже запущена!',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async stopTaskTimer(id: string): Promise<Task> {
    try {
      const task = await this.prisma.task.findFirst({
        where: { id: Number(id) },
      });
      if (!task) {
        throw new HttpException(
          'Не удалось получить задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (task.status) {
        task.status = false;
        const time = new Date();
        const stop_time = Math.round(time.getTime()/1000.0);
        task.time += (stop_time - task.start_time);
        console.log('stop_time -> ' + stop_time + '; time -> ' + task.time);
        task.start_time = 0;
        const updTask = await this.prisma.task.update({
          data: { ...task },
          where: { id: Number(id) },
        });
        if (!updTask) {
          throw new HttpException(
            'Не удалось обновить остановку задачи!',
            HttpStatus.BAD_REQUEST,
          );
        }
        return updTask;
      }
      throw new HttpException(
        'Задача которую пытаются остановить уже остановлена!',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
