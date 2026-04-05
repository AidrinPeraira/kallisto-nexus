export enum AuthMessages {
  USER_ALREADY_EXISTS = "User with this email already exists",
  USER_NOT_FOUND = "User not found",
  INVALID_CREDENTIALS = "Invalid credentials",
  PASSWORD_MISMATCH = "Passwords do not match",
  UNAUTHORIZED = "User is not authorized",

  USER_ROLE_MANDATORY = "User role is mandatory",
  USER_REGISTERED_SUCCESSFULLY = "User registered successfully",
  USER_REGISTERED_FAILED = "User registered failed",
  USER_LOGGED_IN_SUCCESSFULLY = "User logged in successfully",
  USER_LOGGED_IN_FAILED = "User log in failed",

  EMAIL_VERIFIED_SUCCESSFULLY = "Email verified successfully",
  EMAIL_VERIFIED_FAILED = "Email verified failed",
  VERIFICATION_EMAIL_RESENT_SUCCESSFULLY = "Verification email resent successfully",
  VERIFICATION_EMAIL_RESENT_FAILED = "Verification email resent failed",

  TOKEN_EXPIRED = "The token has expired",
  TOKEN_INVALID = "The token is invalid",
  TOKEN_REFRESHED_SUCCESSFULLY = "Token refreshed successfully",
  TOKEN_REFRESHED_FAILED = "Token refreshed failed",
  TOKEN_NOT_FOUND = "Token not found",

  SESSION_EXPIRED = "The session has expired",
}
