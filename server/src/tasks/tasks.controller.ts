import {
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Req,
  Res,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../enum/role.enum';
import { ReadStatsTaskDto } from '../stat-task/dto/read-stats-task.dto';

@Controller('main')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async mainPage(@Req() req: Request) {
    // return "This is Main Page";
    const tasks = await this.taskService.tasks(req['user'].id);

    return tasks;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createNewTask(@Req() req: Request, @Body() taskDto: CreateTaskDto) {
    taskDto.authorId = req['user'].id;
    // TODO: Нет валидации на создание
    //Они есть на уровне проверки полей класса CreateTaskDto
    const task = await this.taskService.createTask(taskDto);
    return task;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateOneTask(@Param('id') id: string, @Body() taskDto: UpdateTaskDto) {
    const task = await this.taskService.updateTask(taskDto, id);
    return task;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteOneTask(@Param('id') id: string) {
    const task = await this.taskService.deleteTask(id);
    return task;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/start_time/:id')
  async startTaskTimer(@Param('id') id: string, @Req() req: Request) {
    const task = await this.taskService.startTaskTimer(id, req['user'].id);
    return task;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/stop_time/:id')
  async stopTaskTimer(@Param('id') id: string) {
    const task = await this.taskService.stopTaskTimer(id);
    return task;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/stat/:time')
  async statPage(@Param('time') timeZone: string, @Req() req: Request) {
    //console.log(req['body']);
    const tasks = await this.taskService.firstStat(
      Number(timeZone),
      req['user'].id,
    ); //req['body'].timeClient
    return tasks;
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/stat/:id')
  // я должен получить часовой пояс в !!!МИНУТАХ(со знаком)!!! (две строки)
  // я должен получить два параметра - это тип времен.интервала И часовой пояс в МИНУТАХ
  async statotherPage(
    @Param('id') numPage: string,
    @Req() req: Request,
    @Body() client: ReadStatsTaskDto,
  ) {
    //console.log(req['body']);
    const obj = await this.taskService.getStatBetweenDates(
      client,
      Number(numPage),
      req['user'].id,
    ); //req['body']

    return obj;
  }
}
