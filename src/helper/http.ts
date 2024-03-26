import { HttpStatus } from '@nestjs/common';

export interface IHttpResponse<T = any> {
  statusCode: number;
  message: T;
}

export const created = <T = any>(data: T): IHttpResponse<T> => ({
  statusCode: HttpStatus.CREATED,
  message: data,
});

export const ok = <T = any>(data: T): IHttpResponse<T> => ({
  statusCode: HttpStatus.OK,
  message: data,
});
