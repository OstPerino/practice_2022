import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // TODO: Перенести порт в переменную env
  await app.listen(4000);
}
bootstrap();
