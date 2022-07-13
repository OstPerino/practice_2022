import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import {StatTaskService} from "../stat-task/stat-task.service";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService,
              private statTaskService: StatTaskService) {}

  async findMore(authorID: number):Promise<Task[] | null> {
    let tasks = await this.prisma.task.findMany({
      where: { authorId: authorID },
    });
    if (!tasks) {
      throw new HttpException(
        'Не удалось получить задачи!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return tasks;
  }

  async tasks(authorID: number): Promise<Task[] | null> {
    // у нас может и не быть задач
    try {
      const tasks = await this.findMore(authorID);
      tasks.forEach(task => {
        if(task.status === true){
          const time = new Date();
          const presentTime = Math.round(time.getTime()/1000.0);
          task.time += (presentTime - task.start_time);
        }
      });
      return tasks;
    } catch (error) {
      // TODO: Нет возвращаемой ошибки
      console.log(error);
    }
  }

  async createTask(dataTask: CreateTaskDto): Promise<Task> {
    try {
      const time = new Date();
      const presentTime = Math.round(time.getTime()/1000.0);
      dataTask.create_time = presentTime;
      const task = await this.prisma.task.create({ data: { ...dataTask } });
      if (!task) {
        throw new HttpException(
          'Не удалось создать задачу!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return task;
    } catch (error) {
       // TODO: Нет возвращаемой ошибки
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
       // TODO: Нет возвращаемой ошибки
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
       // TODO: Нет возвращаемой ошибки
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
       // TODO: Нет возвращаемой ошибки
      console.log(error);
    }
  }

  async startTaskTimer(id: string, authorID: number): Promise<Task> {
    try {
      const tasks =  await this.findMore(authorID);
      let updTaskStart;

      // TODO: Отрефакторить DRY
      tasks.forEach(async task => {
        if(task.status === true && task.id !== Number(id)){
          const time = new Date();
          const presentTime = Math.round(time.getTime()/1000.0);
          task.last_activity = presentTime;
          task.time += (presentTime - task.start_time);
          task.start_time = 0;
          task.status = false;
          const updTaskStop = await this.prisma.task.update({
            data: { ...task },
            where: { id: task.id },
          });
          if (!updTaskStop) {
            throw new HttpException(
              'Не удалось обновить остановку задачи!',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
        if (task.status === false && task.id === Number(id)) {
          task.status = true;
          const time = new Date();
          const startTime = Math.round(time.getTime()/1000.0);
          task.last_activity = startTime;
          task.start_time = startTime;
          console.log('start_time -> ' + task.start_time + '; time -> ' + task.time);
          const updTask = this.prisma.task.update({ // await
            data: { ...task },
            where: { id: Number(id) },
          });
          if (!updTask) {
            throw new HttpException(
              'Не удалось обновить запуск задачи!',
              HttpStatus.BAD_REQUEST,
            );
          }
          updTaskStart = updTask;
        }
      });
      return updTaskStart;
    } catch (error) {
       // TODO: Нет возвращаемой ошибки
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
      // TODO: Отрефакторить DRY
      if (task.status) {
        task.status = false;
        const time = new Date();
        const stop_time = Math.round(time.getTime()/1000.0);
        task.last_activity = stop_time;
        let path_time = (stop_time - task.start_time)
        task.time += path_time;
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
        let stat = {
          taskID: task.id,
          time: path_time,
          stop_time: stop_time
        }
        const statTask = await this.prisma.statTask.create({ data: { ...stat } });
        if (!statTask) {
          throw new HttpException(
            'Не удалось создать статистику задачи!',
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
      // TODO: Нет возвращаемой ошибки
      console.log(error);
    }
  }

  async firstStat(timeClient: number, authorID: number): Promise<Task[] | null> {
    let tasks = await this.findMore(authorID);
    const time = new Date();
    let presentTime = Math.round(time.getTime()/1000.0);
    let lastTime = (presentTime - (timeClient + time.getSeconds()));//(timeClient*3600) + (time.getMinutes()*60)
    console.log("timeClient: " + timeClient);
    console.log("presentTime: " + presentTime);
    console.log("LASTTIME: " + lastTime);
    // Использую тут for, а не forEach так как из-за async await не удается...
    // ...заменить переменную времени(return прорабатывает быстрее чем замена)
    for (let index = 0; index < tasks.length; index++) {
      console.log("TASKS[INDEX]_______");
      console.log(tasks[index]);
      let stats = await this.statTaskService.getStatsTask(tasks[index], lastTime, presentTime);
      let sum: number = 0;
      for (let i = 0; i < stats.length; i++) {
        sum += stats[i].time;
      }
      /*
      stats.forEach( stat => {
        sum += stat.time;
      });
      */
      console.log("SUM: " + sum);

      tasks[index].time = sum;
      console.log("TASK.TIME: " + tasks[index].time);
    }
    /*
    tasks.forEach(async task => {
      let stats = await this.statTaskService.getStatsTask(task, lastTime, presentTime);
      let sum: number = 0;
      stats.forEach( stat => {
        sum += stat.time;
      });
      console.log("SUM: " + sum);

      task.time = sum;
      console.log("TASK.TIME: " + task.time);
    });
    */
    console.log(tasks);
    return tasks;
  }
}
