import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const user = await this.prisma.user.create({
        data: { ...createUserDto },
      });
      if (!user) {
        throw new HttpException(
          'Не удалось создать пользоваетля!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: Нет валидации на существование ресурса
  // тут он не нужен, т.к. мне нужен как результат как есть пользоваетль и как его нет
  async getUserByLogin(login: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { login } });
      //console.log('User from getUserByLogin:');
      //console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: Нет валидации на существование ресурса
  // пока что функция не используется, поэтому вопрос остается открытым
  async findAll(): Promise<User[] | null> {
    try {
      const users = await this.prisma.user.findMany();
      if (!users) {
        throw new HttpException(
          'Не удалось получить пользователей из DB!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: Нет валидации на существование ресурса
  // пока что функция не используется, поэтому вопрос остается открытым
  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      if (!user) {
        throw new HttpException(
          'Не удалось получить пользователя из DB!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: Нет валидации на существование ресурса
  // пока что функция не используется, поэтому вопрос остается открытым
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User | null> {
    try {
      const { where, data } = params;
      return await this.prisma.user.update({ data, where });
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: Нет валидации на существование ресурса
  // пока что функция не используется, поэтому вопрос остается открытым
  async remove(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    try {
      return await this.prisma.user.delete({ where });
    } catch (error) {
      console.log(error);
    }
  }
}
