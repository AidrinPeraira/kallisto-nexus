import { IUserRepository } from "@src/modules/kallisto-auth/domain/repositories/IUserRepository";
import { IAuthService } from "@src/modules/kallisto-auth/domain/services/IAuthService";
import { UserEntity } from "@src/modules/kallisto-auth/domain/entities/UserEntity";
import { UserRole, UserStatus, HttpStatus } from "@packages/common/enums";
import { AppError, ErrorCode } from "@packages/common/errors";
import { IRegisterUserUseCase } from "@src/modules/kallisto-auth/domain/usecases/IRegisterUserUseCase";
import {
  RegisterUserRequestDTO,
  RegisterUserResult,
} from "@src/modules/kallisto-auth/application/dto/AuthDto";
import { AuthMessages } from "@packages/common/messages";

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _authService: IAuthService,
  ) {}

  async execute(
    dto: RegisterUserRequestDTO,
    redirectUrl?: string,
  ): Promise<RegisterUserResult> {
    if (dto.password !== dto.confirmPassword) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        AuthMessages.PASSWORD_MISMATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.role) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        AuthMessages.USER_ROLE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 1. Check if user already exists
    const existingUser = await this._userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new AppError(
        ErrorCode.USER_ALREADY_EXISTS,
        AuthMessages.USER_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    // 2. Create user in better-auth
    const authResult = await this._authService.signUp(
      dto.fullName,
      dto.email,
      dto.password,
      redirectUrl,
    );

    // 3. Create user db for application / business
    const now = new Date();

    const userToCreate = {
      authId: authResult.authId,
      email: dto.email,
      fullName: dto.fullName,
      phoneNumber: dto.contactNumber,
      role: dto.role || UserRole.PROJECT_OWNER,
      status: UserStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    } as UserEntity;

    const createdUser = await this._userRepository.create(userToCreate);

    return {
      userCode: createdUser.userCode,
      email: createdUser.email,
      message: AuthMessages.USER_REGISTERED_SUCCESSFULLY,
    };
  }
}
