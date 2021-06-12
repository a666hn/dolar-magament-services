import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface IRespone<T>  {
    code: number;
    date: Date;
    data: T
}

@Injectable()
export class ResponeMiddleware<T> implements NestInterceptor<T, IRespone<T>> {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<IRespone<T>> {
        return next.handle().pipe(
            map(
                (data) => {
                    const code = ctx.getArgByIndex(1)?.statusCode;
                    const date = new Date();

                    return { code, date, data };
                }
            )
        )
    }
}