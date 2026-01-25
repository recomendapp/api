import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  out: './apps/auth/drizzle',
  schema: './apps/auth/src/db/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.AUTH_DATABASE_URL!,
  },
});

export default config;
