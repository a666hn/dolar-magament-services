import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Run } from './run-console';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import {
    BASE_SERVICE,
    DOLLAR_MANAGEMENT_APP,
} from './globals/dictionary/url.dictionary';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const { APP_PORT } = process.env;

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(`${DOLLAR_MANAGEMENT_APP}/${BASE_SERVICE}`);

    const configService = app.get(ConfigService);
    config.update({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
    });

    await app.listen(APP_PORT || 3030, () => Run());
}

bootstrap();
