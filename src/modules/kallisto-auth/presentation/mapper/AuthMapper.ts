import {
  LoginUserRequestDTO,
  LoginUserResponseDTO,
  LoginUserResult,
  RegisterUserResponseDTO,
  RegisterUserResult,
  ResendVerificationEmailRequestDTO,
  VerifyEmailRequestDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
  RegisterUserRequestDTO,
} from "@src/modules/kallisto-auth/application/dto/AuthDto";

export class AuthMapper {
  static toRegisterRequestDTO(body: any): RegisterUserRequestDTO {
    return {
      email: body.email,
      fullName: body.fullName,
      password: body.password,
      confirmPassword: body.confirmPassword,
      contactNumber: body.contactNumber,
      role: body.role,
    };
  }

  static toRegisterResponseDTO(
    result: RegisterUserResult,
  ): RegisterUserResponseDTO {
    return {
      userCode: result.userCode,
      email: result.email,
    };
  }

  static toLoginUserRequestDTO(body: any): LoginUserRequestDTO {
    return {
      email: body.email,
      password: body.password,
    };
  }

  static toLoginUserResponseDTO(result: LoginUserResult): LoginUserResponseDTO {
    return {
      user: {
        userCode: result.user.userCode,
        fullName: result.user.fullName,
        email: result.user.email,
        role: result.user.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      sessionToken: result.sessionToken,
    };
  }

  static toVerifyEmailRequestDTO(body: any): VerifyEmailRequestDTO {
    return {
      token: body.token,
    };
  }

  static toResendVerificationEmailRequestDTO(
    body: any,
  ): ResendVerificationEmailRequestDTO {
    return {
      email: body.email,
    };
  }

  static toRefreshTokenRequestDTO(body: any): RefreshTokenRequestDTO {
    return {
      refreshToken: body.refreshToken,
      sessionToken: body.sessionToken,
    };
  }

  static toRefreshTokenResponseDTO(result: {
    accessToken: string;
    refreshToken: string;
    sessionToken: string;
  }): RefreshTokenResponseDTO {
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      sessionToken: result.sessionToken,
    };
  }
}
