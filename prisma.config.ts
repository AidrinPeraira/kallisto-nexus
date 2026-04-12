import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "./packages/database/prisma",
  migrations: {
    path: "./packages/database/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
    shadowDatabaseUrl:
      process.env.DATABASE_URL !== process.env.DIRECT_URL
        ? env("DIRECT_URL")
        : undefined,
  },
});
