import { z } from 'zod';

export const commonSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  AUTH_HOST: z.string().default('localhost'),
  AUTH_PORT: z.coerce.number().default(3001),
  AUTH_GRPC_PORT: z.coerce.number().default(50051),
});

export const gatewaySchema = commonSchema.extend({
  WEB_APP_URL: z.url().default('http://localhost:3000'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),

  SUPABASE_URL: z.url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  TYPESENSE_HOST: z.string(),
  TYPESENSE_PORT: z.coerce.number().default(8108),
  TYPESENSE_PROTOCOL: z.enum(['http', 'https']).default('http'),
  TYPESENSE_API_KEY: z.string(),
});

export const authSchema = commonSchema.extend({
  SUPABASE_JWT_SECRET: z.string(),
  AUTH_GRPC_HOST: z.string().default('0.0.0.0'),

  AUTH_DATABASE_URL: z.string(),
});

export function validateEnv<T extends z.ZodType>(schema: T): z.infer<T> {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}
