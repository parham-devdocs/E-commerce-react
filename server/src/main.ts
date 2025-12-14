import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import express from "express";
import path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
        optionsSuccessStatus: 204,
  });
   app.get(ConfigService);
  app.use(cookieParser());
  app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
