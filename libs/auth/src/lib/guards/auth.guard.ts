import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '@api/core';
import { AuthenticatedRequest } from '../types/fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const headers = fromNodeHeaders(request.headers);

    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    request.session = session;

    return true;
  }
}
