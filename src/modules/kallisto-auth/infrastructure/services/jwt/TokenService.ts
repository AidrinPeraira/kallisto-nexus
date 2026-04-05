import jwt from "jsonwebtoken";
import { ITokenService } from "@src/modules/kallisto-auth/domain/services/ITokenService";
import { TokenPayload } from "@packages/common/types";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";
import { env } from "@packages/config/env";
import { AuthMessages } from "@packages/common/messages";

export class TokenService implements ITokenService {
  private readonly secretKey = env.AUTH_SECRET || "default_secret_key";
  private readonly expiresIn = env.ACCESS_TOKEN_EXPIRES_IN || "1d";

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn as any,
    });
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.secretKey) as TokenPayload;
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(
          ErrorCode.TOKEN_EXPIRED,
          AuthMessages.TOKEN_EXPIRED,
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new AppError(
        ErrorCode.TOKEN_INVALID,
        AuthMessages.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  getPayload<T>(token: string): T {
    try {
      const payload = jwt.verify(token, this.secretKey, {
        ignoreExpiration: true,
      });
      return payload as T;
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError(
          ErrorCode.TOKEN_EXPIRED,
          AuthMessages.TOKEN_EXPIRED,
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new AppError(
        ErrorCode.TOKEN_INVALID,
        AuthMessages.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
