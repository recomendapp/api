import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { 
    provider: "pg",
  }),
  basePath: '/',
  plugins: [
	username()
  ],
  emailAndPassword: {
	enabled: true,
  },
  experimental: {
	joins: true,
  }
});