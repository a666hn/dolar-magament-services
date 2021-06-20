import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Run } from './run-console';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import { APP_NAME, SERVICE } from './dictionaries/constant.dictionary';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { APP_PORT } = process.env;

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(`${APP_NAME}/${SERVICE}`);

    const configService = app.get(ConfigService);
    config.update({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
    });

    await app.listen(APP_PORT || 3030, () => Run());
}

bootstrap();
