import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // new winston.transports.Http({
        // }),
        new winston.transports.Console({
          /**
           * level: ascending from most important to least important
           * error 0, 
           * warn 1: error and warn
           * info 2: error, warn, log
           * http 3, verbose 4, debug 5, silly 6
           */
          level: '',
          // handleExceptions: true,
          // handleRejections: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true, // Disable in prod env @ config
            }),
          ),
        }),
        // Transport to write logs in a file => ENV FILE
        new winston.transports.File({ filename: 'logs/combined.log' })
      ],
    }),
  });
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;
  const logger = new Logger();

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  logger.log(`Nest application listening on port: ${port}`, 'NestApplication');
}
bootstrap();
