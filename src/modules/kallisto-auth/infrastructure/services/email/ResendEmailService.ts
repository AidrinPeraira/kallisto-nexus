import { env } from "@packages/config/env";
import { IEmailService } from "@src/modules/kallisto-auth/application/interfaces/services/IEmailService";
import { ILogger } from "@packages/logger";
import { Resend } from "resend";

export class ResendEmailService implements IEmailService {
  private resend: Resend;

  constructor(private readonly _logger: ILogger) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmailVerification(
    email: string,
    verificationUrl: string,
  ): Promise<void> {
    this._logger.info(
      "Resend Email Service: Sending email verification to: ",
      email,
    );

    await this.resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: email,
      subject: "Verify your email",
      html: `
        <p>Welcome to Kallisto</p>
        <p>Please verify your email by clicking the link below</p>
        <a href="${verificationUrl}">Verify Email</a>
      `,
    });

    this._logger.info(
      "Resend Email Service: Email verification sent successfully to: ",
      email,
    );
  }

  async sendPasswordReset(email: string, resetUrl: string): Promise<void> {
    await this.resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `
        <p>Click the link below to reset your password</p>
        <a href="${resetUrl}">Reset Password</a>
      `,
    });
  }
}
