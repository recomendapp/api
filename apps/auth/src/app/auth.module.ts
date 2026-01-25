import { Module } from '@nestjs/common';
import { AuthGrpcController } from './auth.grpc.controller';
import { AuthHttpController } from './auth.http.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { GrpcTransportModule } from '@api/transport';
import { env } from '../env';

@Module({
  imports: [
    GrpcTransportModule,
    JwtModule.register({
      secret: env.SUPABASE_JWT_SECRET,
    }),
  ],
  controllers: [AuthGrpcController, AuthHttpController],
  providers: [AuthService],
})
export class AuthModule {}
