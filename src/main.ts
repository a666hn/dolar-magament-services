import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as os from 'os';
import { Run } from './run-console';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { APP_PORT } = process.env;

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api');

    await app.listen(APP_PORT || 3030, () => Run());
}

bootstrap();