import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { warn } from 'console';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { LoggingInterceptor } from './interceptor/logging/logging.interceptor';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //
  app.useStaticAssets(join(__dirname, '..', 'static'));
  //
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  );
  app.use(compression());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(
    rateLimit({
      windowMs: 1000,
      max: 5000000, // limit each IP to 25 requests per windowMs
    }),
  );
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const config = new DocumentBuilder()
    .setTitle('Qubed Apis')
    .setDescription('Qubed Backend NestJs')
    .setVersion('1.0')
    .addTag('API')
    .setSchemes('http')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const PORT = process.env.PORT || 3000;
  // await app.listen(PORT);
  const server = await app.listen(PORT);
  server.setTimeout(600000);
  warn(`APP IS LISTENING TO PORT ${PORT}`);
}
bootstrap();
