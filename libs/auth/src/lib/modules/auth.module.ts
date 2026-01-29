import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { OptionalAuthGuard } from '../guards/optional-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthGuard, OptionalAuthGuard],
  exports: [AuthGuard, OptionalAuthGuard],
})
export class AuthModule {}
