import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { TransformResponseInterceptors } from './interceptors/response.interceptor';

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptors,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class CoreModule {}
