import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.PORT || "3000",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/mydb",

  NODE_ENV: process.env.NODE_ENV || "development",
  BASE_URL: process.env.BASE_URL || "http://localhost:3000",
  APP_URL: process.env.APP_URL || "my-app://kallisto",

  AUTH_SECRET: process.env.AUTH_SECRET || "",
  SESSION_EXPIRES_IN: Number(process.env.SESSION_EXPIRES_IN) || 604800,
  SESSION_UPDATE_AGE: Number(process.env.SESSION_UPDATE_AGE) || 86400,
  ACCESS_TOKEN_EXPIRES_IN: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 86400,

  WEB_VERIFY_REDIRECT_URL:
    process.env.WEB_VERIFY_REDIRECT_URL || "http://localhost:3000/verified",
  FLUTTER_DEEP_LINK_VERIFY:
    process.env.FLUTTER_DEEP_LINK_VERIFY || "http://localhost:3000/verified",

  RESEND_API_KEY: process.env.RESEND_API_KEY || "my-resend-api-key",
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || "noreply@domain.com",
};
