import { Transport } from '@nestjs/microservices';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { RawServerDefault } from 'fastify';

export const startMicroservices = async (
  app: NestFastifyApplication<RawServerDefault>,
) => {
  // Auth
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath:
        process.env.NODE_ENV === 'production'
          ? __dirname + '/protos/auth.proto'
          : process.cwd() + '/libs/shared/src/protos/auth.proto',
      url: process.env.AUTH_GRPC_URL || '0.0.0.0:50051',
    },
  });

  await app.startAllMicroservices();
};
