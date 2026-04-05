import { env } from "@packages/config/env";
import { IRegisterUserUseCase } from "@src/modules/kallisto-auth/domain/usecases/IRegisterUserUseCase";
import { IAuthController } from "@src/modules/kallisto-auth/presentation/interfaces/IAuthController";
import { AuthMapper } from "@src/modules/kallisto-auth/presentation/mapper/AuthMapper";
import { ILogger } from "@packages/logger";
import { AuthMessages } from "@packages/common/messages";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { Request, Response, NextFunction } from "express";
import { ILoginUserUseCase } from "@src/modules/kallisto-auth/domain/usecases/ILoginUserUseCase";
import { IVerifyEmailUseCase } from "@src/modules/kallisto-auth/domain/usecases/IVerifyEmailUseCase";
import { IResendVerificationEmailUseCase } from "@src/modules/kallisto-auth/domain/usecases/IResendVerificationEmailUseCase";
import { IRefreshTokenUseCase } from "@src/modules/kallisto-auth/domain/usecases/IRefreshTokenUseCase";

export class AuthController implements IAuthController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _registerUserUseCase: IRegisterUserUseCase,
    private readonly _loginUserUseCase: ILoginUserUseCase,
    private readonly _verifyEmailUseCase: IVerifyEmailUseCase,
    private readonly _resendVerificationEmailUseCase: IResendVerificationEmailUseCase,
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
  ) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Register request received", {
        email: req.body.email,
      });

      const data = AuthMapper.toRegisterRequestDTO(req.body);

      //craft the correct redirect url based on use case. web / flutter
      const platform = req.headers["x-platform"];
      let callbackUrl = env.WEB_VERIFY_REDIRECT_URL;
      if (platform === "flutter") {
        callbackUrl = env.FLUTTER_DEEP_LINK_VERIFY;
      }

      const result = await this._registerUserUseCase.execute(data, callbackUrl);
      const responseData = AuthMapper.toRegisterResponseDTO(result);
      res
        .status(HttpStatus.CREATED)
        .json(
          successResponse(
            responseData,
            AuthMessages.USER_REGISTERED_SUCCESSFULLY,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Register User Error : ", error);
      throw error;
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Login request received", {
        email: req.body.email,
      });

      const data = AuthMapper.toLoginUserRequestDTO(req.body);

      const result = await this._loginUserUseCase.execute(data);
      const responseData = AuthMapper.toLoginUserResponseDTO(result);
      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            responseData,
            AuthMessages.USER_LOGGED_IN_SUCCESSFULLY,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Login User Error : ", error);
      throw error;
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Verify email request received");

      const data = AuthMapper.toVerifyEmailRequestDTO(req.body);

      await this._verifyEmailUseCase.execute(data);
      res
        .status(HttpStatus.OK)
        .json(successResponse(null, AuthMessages.EMAIL_VERIFIED_SUCCESSFULLY));
      return;
    } catch (error: unknown) {
      this._logger.error("Verify Email Error : ", error);
      throw error;
    }
  }

  async resendVerificationEmail(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Resend verification email request received", {
        email: req.body.email,
      });

      const data = AuthMapper.toResendVerificationEmailRequestDTO(req.body);

      await this._resendVerificationEmailUseCase.execute(data);
      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            null,
            AuthMessages.VERIFICATION_EMAIL_RESENT_SUCCESSFULLY,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Resend Verification Email Error : ", error);
      throw error;
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Refresh token request received");

      const data = AuthMapper.toRefreshTokenRequestDTO(req.body);

      const result = await this._refreshTokenUseCase.execute(
        data.accessToken,
        data.sessionToken,
      );

      const responseData = AuthMapper.toRefreshTokenResponseDTO(result);
      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            responseData,
            AuthMessages.TOKEN_REFRESHED_SUCCESSFULLY,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Refresh Token Error : ", error);
      throw error;
    }
  }
}
