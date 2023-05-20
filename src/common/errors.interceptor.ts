import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err)
        return throwError(() => {
          console.log(err);
          return new HttpException(
            {
              success: false,
              statusCode: err?.status,
              message:
                err?.response.message ||
                err?.message ||
                'Something went wrong...',
              error: err?.response.error,
            },
            err?.status || HttpStatus.BAD_GATEWAY,
          );
        });
      }),
    );
  }
}
