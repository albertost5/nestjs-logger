import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body } = request;

    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;

      const contentLength = response.get('content-length');
      //   [MyApp] Info    1/12/2022, 16:47:22 [HTTP] method: GET / 200 82 - PostmanRuntime/7.29.2 ::1 - {} +6ms
      //  ${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`

      const logObjResponse = {
        method,
        endpoint: request.url,
        statusCode,
      };

      if (Object.keys(body).length !== 0) logObjResponse['body'] = body;
      this.logger.log(JSON.stringify(logObjResponse));
    });

    next();
  }
}
