import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import validateEnv from './utils/validateEnv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

validateEnv();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Recomend API')
    .setDescription('The API documentation for the Recomend application')
    .setVersion('1.0')
    .addBearerAuth() // This enables JWT authentication in the Swagger UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
