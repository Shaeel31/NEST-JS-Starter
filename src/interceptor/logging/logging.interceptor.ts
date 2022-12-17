import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      '**********************************************************************',
    );
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const ip = request.ip;
    const url = request.originalUrl;
    console.log('method', method);
    console.log('url', url);
    console.log('ip', ip);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`After... ${Date.now() - now}ms | Date:${new Date()}`);
        console.log(
          '**********************************************************************',
        );
      }),
      catchError(response => {
        console.log(response);
        return throwError(response);
      }),
    );
  }
}
