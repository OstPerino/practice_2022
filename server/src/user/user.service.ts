import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {


  constructor(private prisma: PrismaService) { }


  // TODO: Не асинхронный метод
  create(createUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto
      }
    });
  }

  // TODO: Нет возвращаемых типов
  findAll() {
    return this.prisma.user.findMany();
  }

  // TODO: Нет валидации на существование ресурса
  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  // TODO: Нет валидации на существование ресурса
  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  // TODO: Нет валидации на существование ресурса
  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }

  // TODO: Нет валидации на существование ресурса
  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findUnique({where: {login}});
    console.log(user);

    return user;
  }




}
