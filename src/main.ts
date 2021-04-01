import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    logger.log(`--- ${process.env.NODE_ENV} server started on ${process.env.PORT} ---`)
  })
}
bootstrap();
