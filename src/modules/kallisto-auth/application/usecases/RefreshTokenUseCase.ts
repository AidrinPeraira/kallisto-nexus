import { IUserRepository } from "@src/modules/kallisto-auth/domain/repositories/IUserRepository";
import { IAuthService } from "@src/modules/kallisto-auth/domain/services/IAuthService";
import { ITokenService } from "@src/modules/kallisto-auth/domain/services/ITokenService";
import { IRefreshTokenUseCase } from "@src/modules/kallisto-auth/domain/usecases/IRefreshTokenUseCase";
import { HttpStatus, TokenType } from "@packages/common/enums";
import { AppError, ErrorCode } from "@packages/common/errors";
import { AuthMessages } from "@packages/common/messages";
import { TokenPayload } from "@packages/common/types";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _authService: IAuthService,
    private readonly _userRepostiry: IUserRepository,
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(
    accessToken: string,
    sessionToken: string,
  ): Promise<{
    sessionToken: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = this._tokenService.getPayload<TokenPayload>(accessToken);

    const user = await this._userRepostiry.findByEmail(payload.email);
    if (!user) {
      throw new AppError(
        ErrorCode.USER_NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const accessTokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      userCode: user.userCode,
      role: user.role,
      tokenType: TokenType.ACCESS,
    };

    const refreshTokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      userCode: user.userCode,
      role: user.role,
      tokenType: TokenType.REFRESH,
    };

    const newAccessToken =
      this._tokenService.generateAccessToken(accessTokenPayload);
    const newRefreshToken =
      this._tokenService.generateRefreshToken(refreshTokenPayload);

    const newSessionToken =
      await this._authService.refreshSession(sessionToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      sessionToken: newSessionToken,
    };
  }
}
