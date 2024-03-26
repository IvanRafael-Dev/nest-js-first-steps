import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { EntityNotFoundError } from 'src/errors/entity-not-found-error';
import { InvalidParamError } from 'src/errors/invalid-param-error';
import { IHttpResponse } from 'src/helper/http';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: IHttpResponse) => {
        return response;
      }),
      catchError((error) => {
        switch (error.constructor) {
          case EntityNotFoundError:
            throw new NotFoundException(error.message);
          case InvalidParamError:
            throw new BadRequestException(error.message);
          default:
            throw new InternalServerErrorException();
        }
      }),
    );
  }
}
