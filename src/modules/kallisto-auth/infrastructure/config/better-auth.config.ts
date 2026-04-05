import { prisma } from "@packages/config/prisma";
import { env } from "@packages/config/env";
import { ResendEmailService } from "@src/modules/kallisto-auth/infrastructure/services/email/ResendEmailService";
import { WinstonLogger } from "@packages/logger";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";

const logger = new WinstonLogger();
const emailService = new ResendEmailService(logger);

export const auth = betterAuth({
  plugins: [bearer()],
  secret: env.AUTH_SECRET,
  session: {
    expiresIn: env.SESSION_EXPIRES_IN,
    updateAge: env.SESSION_UPDATE_AGE,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await emailService.sendEmailVerification(user.email, url);
    },
  },
});
