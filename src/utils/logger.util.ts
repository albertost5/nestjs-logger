import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { NestApplicationOptions } from '@nestjs/common';

export const loggerOptions = {
  logger: WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        /**
         * level: ascending from most important to least important
         * error 0, warn 1: error and warn, info 2: error, warn, log http 3, verbose 4, debug 5, silly 6
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
      new winston.transports.File({
        filename: process.env.LOG_PATH,
        // To write timestamps in logs saved file
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.json(),
        ),
      }),
    ],
  }),
} as NestApplicationOptions;
