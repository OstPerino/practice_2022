import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async tasks(authorID: number): Promise<Task[] | null> { // у нас может и не быть задач
    try {
      return await this.prisma.task.findMany({ where: {authorId: authorID} });
    } catch (error) {
      console.log(error);
    }
  }

  async createTask(dataTask: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.prisma.task.create({ data: { ...dataTask } });
      if (!task) {
          throw new HttpException('Не удалось создать задачу!', HttpStatus.BAD_REQUEST);
      }
      return task;
    } catch (error) {
      console.log(error);
    }
  }

  async task(authorID: number, taskID: string): Promise<Task> {
    try {
      const task = await this.prisma.task.findFirst({ where: {id: Number(taskID), authorId: authorID} });
      if (!task) {
          throw new HttpException('Не удалось получить задачу!', HttpStatus.BAD_REQUEST);
      }
      return task;
    } catch (error) {
        console.log(error);
      }
  }

  async updateTask(dataTask: UpdateTaskDto, id: string): Promise<Task> {
    try {
      const task = await this.prisma.task.update({ data: { ...dataTask }, where: { id: Number(id)} });
      if (!task) {
          throw new HttpException('Не удалось обновить задачу!', HttpStatus.BAD_REQUEST);
      }
      return task;
    } catch (error) {
        console.log(error);
      }
  }

  async deleteTask(idTask: string): Promise<Task> {
    try {
      const task = await this.prisma.task.delete({ where: {id: Number(idTask)} });
      if (!task) {
          throw new HttpException('Не удалось удалить задачу!', HttpStatus.BAD_REQUEST);
      }
      return task;
    } catch (error) {
        console.log(error);
      }
  }



}
