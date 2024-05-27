import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException, ValidationFilter } from './util/filter.validation';
import { ValidationError } from 'class-validator';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //biar saat akses ditambahakan /api
  app.setGlobalPrefix('/api', {
    exclude: ['/images/(.*)'], // Mengecualikan rute untuk file statis
  });

  //manggil fungsi, misal require name sama email
  //trs yang diisi name aja
  //jadi yang muncul error biar email saja
  //sebelumnya, name nya juga muncul sebagai error
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {};
        errors.forEach((err) => {
          const propertyName = err.property || 'general';
          errMsg[propertyName] = [...Object.values(err.constraints)];
        });
        return new ValidationException(errMsg);
      }
    })
  )

  //set port dari env
  const port = process.env.PORT;
  //set port di app
  await app.listen(port);
}
bootstrap();
