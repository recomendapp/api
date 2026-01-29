import { Session, User } from 'better-auth/types';
import { FastifyRequest } from 'fastify';

export interface AuthenticatedRequest extends FastifyRequest {
  session: {
    session: Session;
    user: User;
  };
}

export interface OptionalAuthenticatedRequest extends FastifyRequest {
  session?: {
    session: Session;
    user: User;
  };
}
