import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { loggerOptions } from './utils/logger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, loggerOptions);
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
