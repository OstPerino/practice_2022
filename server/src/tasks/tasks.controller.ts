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

@Controller('main')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async mainPage(@Req() req: Request, @Res() res: Response) {
    // return "This is Main Page";
    console.log('User from method:');
    console.log(req['user'].id); // хранит даже не запихав его в гуарде

    const tasks = await this.taskService.tasks(req['user'].id);
    res.send(tasks);
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createNewTask(@Req() req: Request, @Body() taskDto: CreateTaskDto) {
    taskDto.authorId = req['user'].id;
    console.log('Type: ' + typeof taskDto.authorId);
    const task = await this.taskService.createTask(taskDto);
    return task;
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateOneTask(@Param('id') id: string, @Body() taskDto: UpdateTaskDto) {
    const task = await this.taskService.updateTask(taskDto, id);
    return task;
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteOneTask(@Param('id') id: string) {
    const task = await this.taskService.deleteTask(id);
    return task;
  }
}
