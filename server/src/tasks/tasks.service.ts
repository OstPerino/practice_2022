import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import {StatTaskService} from "../stat-task/stat-task.service";
import { ReadStatsTaskDto } from "../stat-task/dto/read-stats-task.dto"

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService,
              private statTaskService: StatTaskService) {}

// При рефакторинге добавить эту функцию и реализовать остальные
  async getPresentTime(): Promise<number> {
    const time = new Date();
    let presentTime = Math.round(time.getTime()/1000.0);
    presentTime += (time.getTimezoneOffset() * 60);
    return presentTime;
  }

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
          let presentTime = Math.round(time.getTime()/1000.0);
          presentTime += (time.getTimezoneOffset() * 60);
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
      let presentTime = Math.round(time.getTime()/1000.0);
      presentTime += (time.getTimezoneOffset() * 60);
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
          let presentTime = Math.round(time.getTime()/1000.0);
          presentTime += (time.getTimezoneOffset() * 60);
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
          let startTime = Math.round(time.getTime()/1000.0);
          startTime += (time.getTimezoneOffset() * 60);
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
        let stop_time = Math.round(time.getTime()/1000.0);
        stop_time += (time.getTimezoneOffset() * 60);
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

  async getEndTasks(tasks: Task[], lastTime: number, presentTime: number): Promise<Task[] | null> {
    let masTasks: Task[] = [];
    if (tasks !== null) {
      console.log("METHOD GETENDTASKS!");
      console.log("presentTime -> " + presentTime);
      console.log("lastTime -> " + lastTime);
      console.log("RAZH -> " + (presentTime - lastTime));
      console.log(tasks);
      console.log("tasks kol. == " + tasks.length);
      // Использую тут for, а не forEach так как из-за async await не удается...
      // ...заменить переменную времени(return прорабатывает быстрее чем замена)
      for (let index = 0; index < tasks.length; index++) {
        console.log(tasks[index]);
        let stats = await this.statTaskService.getStatsTask(tasks[index], lastTime, presentTime);
        let sum: number = 0;
        //console.log(stats);
        console.log(stats);
        console.log("stats FOR!!!");
        for (let i = 0; i < stats.length; i++) {

          console.log(stats[i]);
          sum += stats[i].time;
        }
        tasks[index].time = sum;
        console.log("TASK.TIME: " + tasks[index].time);
        if (sum !== 0) {
          masTasks.push(tasks[index]);
          //masTasks = tasks[index];
        }
        /*
        if (tasks[index].time === 0) {
          tasks.splice(index, 1);
        }
        */
      }
    }
    return masTasks;
  }

  async firstStat(clientTimeZone: number, authorID: number): Promise<Task[] | null> {
    console.log("clientTimeZone -> " + clientTimeZone);
    let tasks = await this.findMore(authorID);


    const time = new Date();
    let presentTime = Math.round(time.getTime()/1000.0);
    console.log("time - " + time);
    console.log("timeUTC - " + presentTime);
    presentTime += (time.getTimezoneOffset() * 60);
    console.log("timeUTC(-UTC) - " + presentTime);
    let clientPresentTime = presentTime - (clientTimeZone * 60);
    const timeOnClient = new Date(clientPresentTime * 1000);
    console.log("timeOnClient - " + timeOnClient);

    let lastTime = (presentTime - ((timeOnClient.getHours() * 3600) + (timeOnClient.getMinutes() * 60) + (timeOnClient.getSeconds())));
    console.log(timeOnClient.getHours() + '_' + timeOnClient.getMinutes() + '_' + timeOnClient.getSeconds());
    console.log("SUM MINUS -> " + ((timeOnClient.getHours() * 3600) + (timeOnClient.getMinutes() * 60) + (timeOnClient.getSeconds())));
    console.log("timeClient: " + clientTimeZone);
    console.log("presentTime: " + presentTime);
    console.log("LASTTIME: " + lastTime);
    console.log("RAZH -> " + (presentTime - lastTime));

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
    return this.getEndTasks(tasks, lastTime, presentTime);;
  }

  async getStatBetweenDates(client: ReadStatsTaskDto, numPage: number, authorID: number): Promise<Object> {//Promise<Task[] | null>
    if (numPage < 0) {
      throw new HttpException(
        'Неверно указана страница(numPage)!',
        HttpStatus.BAD_REQUEST,
      );
    }
    let tasks = await this.findMore(authorID);
    const time = new Date();
    let presentTime = Math.round(time.getTime()/1000.0);
    presentTime += (time.getTimezoneOffset() * 60);
    let clientPresentTime = presentTime - (client.timeClient * 60);
    const timeOnClient = new Date(clientPresentTime * 1000);
    let lastTime = (presentTime - ((timeOnClient.getHours() * 3600) + (timeOnClient.getMinutes() * 60) + (timeOnClient.getSeconds())));
    //const newTime = new Date(timeOnClient.getFullYear(), timeOnClient.getMonth(), timeOnClient.getDate());
    //let lastTime = Math.round(newTime.getTime()/1000.0);
    if (client.interval === "day") {
      if (numPage > 0) {
        presentTime = (lastTime - ((numPage - 1) * 86400));
        lastTime = (presentTime - 86400);
      }
    }
    if (client.interval === "week") {
      let dayOnWeek = timeOnClient.getDay();
      if (dayOnWeek === 0) {
        dayOnWeek = 7;
      }
      lastTime -= ((dayOnWeek - 1) * 86400);
      if (numPage > 0) {
        presentTime = (lastTime - ((numPage - 1) * 604800));
        lastTime = (presentTime - 604800);
      }
    }
    if (client.interval === "month") {
      //const dateMonth = new Date(Date.UTC(timeOnClient.getFullYear(), timeOnClient.getMonth(), 1));
      //lastTime = Math.round(dateMonth.getTime()/1000.0) + ;
      lastTime -= ((timeOnClient.getDate() - 1) * 86400);
      if (numPage > 0) {
        let monthNewYear = timeOnClient.getFullYear();
        let monthNewMonth:number ;
        if (timeOnClient.getMonth() >= numPage) {
          monthNewMonth = (timeOnClient.getMonth() - numPage);
        }
        if(timeOnClient.getMonth() < numPage)  {
          let pageYear = (numPage / 12);
          let pageMonth = (numPage % 12);
          monthNewMonth = (11 - (pageMonth - 1));
          monthNewYear -= (1 + (pageYear * 1));
        }
        const dateMonthLast = new Date(Date.UTC(monthNewYear, monthNewMonth, 1));
        lastTime = Math.round(dateMonthLast.getTime()/1000.0) - (client.timeClient * 60) + (time.getTimezoneOffset() * 60);
        if (monthNewMonth === 11) {
          monthNewMonth = 0;
          monthNewYear += 1;
        }else {
          monthNewMonth += 1;
        }
        const dateMonthPresent = new Date(Date.UTC(monthNewYear, monthNewMonth, 1));
        presentTime = Math.round(dateMonthPresent.getTime()/1000.0) - (client.timeClient * 60) + (time.getTimezoneOffset() * 60);
        /*
        const dateMonth1 = new Date(monthNewYear, monthNewMonth, 1);
        lastTime = Math.round(dateMonth1.getTime()/1000.0);
        if (dateMonth1.getMonth() === 1) {
          const dateMonthFeb = new Date(monthNewYear, monthNewMonth, 29);
          if (dateMonthFeb.getDate() === 29) {
            //не доделано, так как найден способ проще!
          }
        }
        */
      }
    }
    let completeTasks = await this.getEndTasks(tasks, lastTime, presentTime );
    lastTime -= (client.timeClient * 60);
    presentTime -= (client.timeClient * 60);
    if(client.interval === "month" && numPage > 0){
      lastTime += ((client.timeClient * 60) * 2);
      presentTime += ((client.timeClient * 60) * 2);
    }
    let strPresentTime = new Date(presentTime * 1000).toString().substr(0,24);
    let strLastTime = new Date(lastTime * 1000).toString().substr(0,24); // return...
    let obj = {
      timeInterval: strLastTime + " - " + strPresentTime,
      page: numPage,
      tasks: completeTasks
    };
    return obj;
  }
}
