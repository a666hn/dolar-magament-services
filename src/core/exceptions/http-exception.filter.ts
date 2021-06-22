import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IResponseHttp } from '../interceptors/response.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const exceptionResponse = exception.getResponse();
        const status = exception.getStatus();
        // const message = exception.message; // Not cover when add error message from class-validator
        const message = exceptionResponse['message'].toString(); // Use this for catch error message when using class validator

        const payload: IResponseHttp<null> = {
            status,
            method: request.method,
            message: message,
        };

        response.status(status).json(payload);
    }
}
