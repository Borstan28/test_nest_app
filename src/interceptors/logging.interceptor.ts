import { Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap(async (data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        await this.logRequestAsync({
          requestDuration: duration,
          requestData: request.body,
          responseData: data,
          httpStatus: context.switchToHttp().getResponse().statusCode,
        });
      }),
      catchError((error) => {
        console.error('Помилка при логуванні запиту:', error);
        return new Observable<never>((observer) => {
          observer.error(error);
        });
      }),
    );
  }

  private async logRequestAsync(logData: any): Promise<void> {
    try {
      const response = await this.httpService.post('http://localhost:8765/logging', logData).toPromise();
    } catch (error) {
      console.error('Помилка при логуванні запису:', error);
      throw error;
    }
  }
}
