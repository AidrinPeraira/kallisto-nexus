import { UserEntity } from "@src/modules/kallisto-auth/domain/entities/UserEntity";
import { UserRole } from "@packages/common/enums";

export interface RegisterUserRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  contactNumber: string;
  role: UserRole;
}

export interface RegisterUserResult {
  userCode: string;
  email: string;
  message: string;
}

export interface RegisterUserResponseDTO {
  userCode: string;
  email: string;
}

export interface LoginUserRequestDTO {
  email: string;
  password: string;
}

export interface LoginUserResult {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

export interface LoginUserResponseDTO {
  user: {
    userCode: string;
    fullName: string;
    email: string;
    role: UserRole;
  };
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}

export interface VerifyEmailRequestDTO {
  token: string;
}

export interface ResendVerificationEmailRequestDTO {
  email: string;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
  sessionToken: string;
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  sessionToken: string;
}
