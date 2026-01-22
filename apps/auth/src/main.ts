import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { join } from 'path';

const protoPath =
  process.env.NODE_ENV === 'production'
    ? join(__dirname, 'protos/auth.proto')
    : join(process.cwd(), 'libs/shared/src/protos/auth.proto');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath,
        url: process.env.AUTH_GRPC_URL || '0.0.0.0:50051',
      },
    },
  );
  await app.listen();
}

bootstrap();
