import { NestFactory, } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AuthModule } from './app/auth.module';
import { createGrpcOptions } from '@api/transport';
import { env } from './env';
import { MicroserviceOptions } from '@nestjs/microservices';

export let app: NestFastifyApplication;

async function bootstrap() {
  const adapter = new FastifyAdapter();
  app = await NestFactory.create<NestFastifyApplication>(
    AuthModule,
    adapter
  );
  app.connectMicroservice<MicroserviceOptions>(
    createGrpcOptions({
      packageName: 'auth',
      protoDomain: 'auth',
      protoFile: 'auth.proto',
      url: `${env.AUTH_GRPC_HOST}:${env.AUTH_GRPC_PORT}`,
    }),
  );
  await app.startAllMicroservices();
  await app.listen({
    port: env.AUTH_PORT,
    host: env.AUTH_HOST,
  });
  Logger.log(`🚀 Auth microservice is running on HTTP:${env.AUTH_PORT} and gRPC listen on ${env.AUTH_GRPC_HOST}:${env.AUTH_GRPC_PORT}`);
}

bootstrap();
