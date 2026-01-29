import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '@api/core';
import { OptionalAuthenticatedRequest } from '../types/fastify';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<OptionalAuthenticatedRequest>();

    const headers = fromNodeHeaders(request.headers);

    const session = await auth.api.getSession({
      headers,
    });

    if (session) {
      request.session = session;
    }

    return true;
  }
}
