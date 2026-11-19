// ============================================================
// UniEats — Environment Variable Loader
// Loads .env via dotenv and validates required variables.
// ============================================================

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  // Database
  DB_HOST: z.string().default("postgres"),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default("unieats"),
  DB_PASSWORD: z.string().default("unieats_secret"),
  DB_NAME: z.string().default("unieats_db"),

  // pgAdmin
  PGADMIN_EMAIL: z.string().email().default("admin@unieats.local"),
  PGADMIN_USER: z.string().default("admin"),
  PGADMIN_PASSWORD: z.string().default("admin"),

  // Application
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),

  // Gemini AI
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL: z
    .string()
    .default("gemini-3.5-flash-lite"),
});

type Env = z.infer<typeof envSchema>;

export { Env };

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }

  return parsed.data;
}

export const env = validateEnv();