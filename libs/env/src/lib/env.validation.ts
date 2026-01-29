import { z } from 'zod';

export const commonSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const apiSchema = commonSchema.extend({
  WEB_APP_URL: z.url().default('http://localhost:3000'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string(),

  SUPABASE_URL: z.url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  TYPESENSE_HOST: z.string(),
  TYPESENSE_PORT: z.coerce.number().default(8108),
  TYPESENSE_PROTOCOL: z.enum(['http', 'https']).default('http'),
  TYPESENSE_API_KEY: z.string(),
});

export function validateEnv<T extends z.ZodType>(schema: T): z.infer<T> {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}
