import { betterAuth } from 'better-auth';
import { openAPI, username } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db/client';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  basePath: '/auth',
  plugins: [username(), openAPI()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  experimental: {
    joins: true,
  },
  // Custom Core Schema
  user: {
    additionalFields: {
      usernameUpdatedAt: {
        type: 'date',
        required: false,
        defaultValue: null,
        input: false,
      },
    },
  },
});
