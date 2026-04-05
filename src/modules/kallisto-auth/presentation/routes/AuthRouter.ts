import { IAuthController } from "@src/modules/kallisto-auth/presentation/interfaces/IAuthController";
import {
  LoginUserSchema,
  RefreshTokenSchema,
  RegisterUserSchema,
} from "@src/modules/kallisto-auth/presentation/validators/AuthValidators";
import { validate } from "@packages/common/middleware";
import { Router } from "express";

export function createAuthRoutes(authController: IAuthController) {
  const router = Router();

  router.post(
    "/register",
    validate(RegisterUserSchema),
    authController.registerUser.bind(authController),
  );

  router.post(
    "/login",
    validate(LoginUserSchema),
    authController.loginUser.bind(authController),
  );

  router.post("/verify-email", authController.verifyEmail.bind(authController));

  router.post(
    "/resend-verification-email",
    authController.resendVerificationEmail.bind(authController),
  );

  router.post(
    "/refresh",
    validate(RefreshTokenSchema),
    authController.refreshToken.bind(authController),
  );

  return router;
}
