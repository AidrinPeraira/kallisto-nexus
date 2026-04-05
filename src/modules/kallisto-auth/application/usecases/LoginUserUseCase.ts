import {
  LoginUserRequestDTO,
  LoginUserResult,
} from "@src/modules/kallisto-auth/application/dto/AuthDto";
import { IUserRepository } from "@src/modules/kallisto-auth/domain/repositories/IUserRepository";
import { IAuthService } from "@src/modules/kallisto-auth/domain/services/IAuthService";
import { ITokenService } from "@src/modules/kallisto-auth/domain/services/ITokenService";
import { ILoginUserUseCase } from "@src/modules/kallisto-auth/domain/usecases/ILoginUserUseCase";
import { HttpStatus, UserStatus } from "@packages/common/enums";
import { AppError, ErrorCode } from "@packages/common/errors";
import { AuthMessages } from "@packages/common/messages";
import { TokenPayload } from "@packages/common/types";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _authService: IAuthService,
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(dto: LoginUserRequestDTO): Promise<LoginUserResult> {
    if (!dto.password || !dto.email) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        AuthMessages.INVALID_CREDENTIALS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this._userRepository.findByEmail(dto.email);
    if (!existingUser) {
      throw new AppError(
        ErrorCode.USER_NOT_FOUND,
        AuthMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const payload: TokenPayload = {
      userId: existingUser.id,
      userCode: existingUser.userCode,
      fullName: existingUser.fullName,
      role: existingUser.role,
      email: existingUser.email,
    };

    const accessToken = this._tokenService.generateAccessToken(payload);

    //Add logic to prevent blocked user login after editing the user schema.
    const result = await this._authService.signIn(dto.email, dto.password);
    return {
      user: existingUser,
      accessToken: accessToken,
      sessionToken: result.token,
    };
  }
}
