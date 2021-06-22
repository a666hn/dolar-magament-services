import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from 'src/interfaces/rests/admin/users/users.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { TransformResponseInterceptors } from './interceptors/response.interceptor';

@Module({
    imports: [UsersModule],
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
