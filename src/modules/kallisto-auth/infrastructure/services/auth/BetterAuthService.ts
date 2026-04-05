import { IAuthService } from "@src/modules/kallisto-auth/domain/services/IAuthService";
import { auth } from "@src/modules/kallisto-auth/infrastructure/config/better-auth.config";
import { HttpStatus } from "@packages/common/enums";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ILogger } from "@packages/logger";
import { AuthMessages } from "@packages/common/messages";

export class BetterAuthService implements IAuthService {
  constructor(private readonly _logger: ILogger) {}

  async signUp(
    name: string,
    email: string,
    password: string,
    redirectUrl?: string,
  ): Promise<{ authId: string }> {
    this._logger.info("Better Auth Service: Signing up user", {
      name,
      email,
      password,
    });

    //signing the user up
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: redirectUrl,
      },
    });

    this._logger.info("Better Auth Service: User signed up successfully", {
      authId: result.user.id,
    });

    return {
      authId: result.user.id,
    };
  }

  async signIn(email: string, password: string): Promise<{ token: string }> {
    this._logger.info("Better Auth Service: Signing in user", {
      email,
      password,
    });

    //signing the user in
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    this._logger.info("Better Auth Service: User signed in successfully", {
      authId: result.user.id,
    });

    return {
      token: result.token,
    };
  }

  async verifyEmail(token: string): Promise<void> {
    this._logger.info("Better Auth Service: Verifying email");

    const result = await auth.api.verifyEmail({
      query: { token },
    });

    this._logger.info("Better Auth Service: Email verified successfully");
  }

  async resendVerificationEmail(email: string): Promise<void> {
    this._logger.info("Better Auth Service: Resending verification email", {
      email,
    });

    await auth.api.sendVerificationEmail({
      body: { email },
    });

    this._logger.info(
      "Better Auth Service: Verification email resent successfully",
      {
        email,
      },
    );
  }

  async refreshSession(sessionToken: string): Promise<string> {
    this._logger.info("Better Auth Service: Refreshing session", {
      sessionToken,
    });

    const result = await auth.api.getSession({
      headers: new Headers({
        authorization: `Bearer ${sessionToken}`,
      }),
      asResponse: false,
    });

    console.log(sessionToken, result);

    if (!result || !result.session) {
      throw new AppError(
        ErrorCode.SESSION_EXPIRED,
        AuthMessages.SESSION_EXPIRED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    this._logger.info("Better Auth Service: Session refreshed successfully", {
      sessionId: result.session,
      user: result.user,
    });

    return result.session.token;
  }
}
