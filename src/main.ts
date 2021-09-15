import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT, () => {
    logger.log(`--- ${process.env.NODE_ENV} server started on ${process.env.PORT} ---`)
  })
}
bootstrap();
