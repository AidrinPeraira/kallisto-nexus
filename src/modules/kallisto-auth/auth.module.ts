//this is where everything is wired up

import { WinstonLogger } from "@packages/logger";
import { LoginUserUseCase } from "@src/modules/kallisto-auth/application/usecases/LoginUserUseCase";
import { RefreshTokenUseCase } from "@src/modules/kallisto-auth/application/usecases/RefreshTokenUseCase";
import { RegisterUserUseCase } from "@src/modules/kallisto-auth/application/usecases/RegisterUserUseCase";
import { ResendVerificationEmailUseCase } from "@src/modules/kallisto-auth/application/usecases/ResendVerificationEmailUseCase";
import { VerifyEmailUseCase } from "@src/modules/kallisto-auth/application/usecases/VerifyEmailUseCase";
import { PostgresUserRepository } from "@src/modules/kallisto-auth/infrastructure/repositories/PostgressUserRepository";
import { BetterAuthService } from "@src/modules/kallisto-auth/infrastructure/services/auth/BetterAuthService";
import { TokenService } from "@src/modules/kallisto-auth/infrastructure/services/jwt/TokenService";
import { AuthController } from "@src/modules/kallisto-auth/presentation/controller/AuthController";

export function createAuthModule() {
  //utils
  const logger = new WinstonLogger();

  //repositories
  const userRepository = new PostgresUserRepository();

  //services
  const authService = new BetterAuthService(logger);
  const tokenService = new TokenService();

  //usecases
  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    authService,
  );
  const loginUserUseCase = new LoginUserUseCase(
    userRepository,
    authService,
    tokenService,
  );
  const verifyEmailUseCase = new VerifyEmailUseCase(authService);
  const resendVerificationEmailUseCase = new ResendVerificationEmailUseCase(
    authService,
  );
  const refreshTokenUseCase = new RefreshTokenUseCase(
    authService,
    userRepository,
    tokenService,
  );

  //constroller
  const authController = new AuthController(
    logger,
    registerUserUseCase,
    loginUserUseCase,
    verifyEmailUseCase,
    resendVerificationEmailUseCase,
    refreshTokenUseCase,
  );

  return {
    authController,
  };
}
