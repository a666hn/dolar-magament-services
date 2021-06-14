import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IResponseHttp<T> {
    code: number;
    method: string;
    errorMessage?: string;
    data: T;
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
                const code = http.getResponse().statusCode;
                const errorMessage = '';

                return { code, method, errorMessage, data };
            }),
        );
    }
}
