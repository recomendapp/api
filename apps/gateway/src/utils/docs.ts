import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupVersionedDocs(
  app: NestFastifyApplication,
  versions: string[],
) {
  for (const version of versions) {
    const config = new DocumentBuilder()
      .setTitle(`API ${version}`)
      .setVersion(version)
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

    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey, methodKey) =>
        `${version}_${controllerKey}_${methodKey}`,
    });

    document.paths = Object.fromEntries(
      Object.entries(document.paths).filter(([path]) =>
        path.startsWith(`/${version}`),
      ),
    );

    // JSON
    app.getHttpAdapter().get(`/${version}/api-json`, (_, res) => {
      res.send(document);
    });

    // Scalar UI
    app.use(
      `/${version}/api-docs`,
      apiReference({
        url: `/${version}/api-json`,
        withFastify: true,
        theme: 'purple',
      }),
    );
  }
}