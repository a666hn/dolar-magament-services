import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponseHttp<T> {
    status: number;
    method: string;
    message: string;
    data?: T;
}

@Injectable()
export class TransformResponseInterceptors<T>
    implements NestInterceptor<T, IResponseHttp<T>>
{
    intercept(
        ctx: ExecutionContext,
        next: CallHandler,
    ): Observable<IResponseHttp<T>> {
        return next.handle().pipe(
            map((data) => {
                const http = ctx.switchToHttp();
                const method = http.getRequest().method;
                const status = http.getResponse().statusCode;

                return {
                    status,
                    method,
                    message: data?.message,
                    data: data?.data,
                };
            }),
        );
    }
}
