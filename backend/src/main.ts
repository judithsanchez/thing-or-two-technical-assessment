//  thing-or-two-techincal-assessment/backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Use NestExpressApplication
  app.enableCors();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  await app.listen(3000);
}
bootstrap();
