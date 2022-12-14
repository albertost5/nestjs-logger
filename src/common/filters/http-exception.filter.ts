import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { exceptionTitle } from './constant.filter';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // exception
    // response: { statusCode: 404, message: 'Cannot GET /cats', error: 'Not Found' },
    // status: 404,
    // options: {}

    response.status(status).json({
      statusCode: status,
      title: exceptionTitle[status],
      message: (exception.getResponse() as any).message,
    });
  }
}
