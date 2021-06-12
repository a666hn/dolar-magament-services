import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionConfigurationClass } from './databases/configs/connection.config';
import * as dotenv from 'dotenv';
import { AccountAPP } from './module.list';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponeMiddleware } from './globals/middlewares/response.middleware';

dotenv.config();

let mode: string = process.env.NODE_ENV;
let connection: any;

const dbConnection = new DbConnectionConfigurationClass();

if (mode === 'development') {
    connection = dbConnection.developmentAccount;
}

@Module({
    imports: [
        // will make the .env properties available throughout the application.
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(connection),

        ...AccountAPP
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponeMiddleware
        }
    ]
})
export class AppModule {}
