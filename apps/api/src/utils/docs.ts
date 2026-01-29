import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const createDocument = (app: NestFastifyApplication): OpenAPIObject => {
  const config = new DocumentBuilder()
    .setTitle('Recomend API')
    .setDescription('The API documentation for the Recomend application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // optional, arbitrary value for Swagger UI
        in: 'header',
        description: 'Enter JWT token',
      },
      'access-token', // This name is important for referencing this security scheme
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return document;
};

export const setupDocs = (app: NestFastifyApplication) => {
  const document = createDocument(app);

  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.send(document);
  });
  app.use(
    '/docs',
    apiReference({
      url: '/api-json',
      withFastify: true,
      theme: 'purple',
    }),
  );
};
