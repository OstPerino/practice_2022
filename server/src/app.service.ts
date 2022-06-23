import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}