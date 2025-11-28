import { JwtPayload } from '@supabase/supabase-js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}
