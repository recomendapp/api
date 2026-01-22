import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTH_SERVICE_NAME,
  AUTH_PACKAGE_NAME,
  AuthGuard,
  OptionalAuthGuard,
} from '@app/shared';
import { join } from 'path';

const protoPath =
  process.env.NODE_ENV === 'production'
    ? join(__dirname, 'protos/auth.proto')
    : join(process.cwd(), 'libs/shared/src/protos/auth.proto');

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath,
          url: process.env.AUTH_GRPC_URL || '0.0.0.0:50051',
        },
      },
    ]),
  ],
  providers: [AuthGuard, OptionalAuthGuard],
  exports: [AuthGuard, OptionalAuthGuard, ClientsModule],
})
export class AuthModule {}
