import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // scope this in a deployed environment
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
