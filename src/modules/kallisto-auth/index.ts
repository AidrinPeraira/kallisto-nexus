import { createAuthModule } from "@src/modules/kallisto-auth/auth.module";
import { createAuthRoutes } from "@src/modules/kallisto-auth/presentation/routes/AuthRouter";
import { Router } from "express";

/**
 * Public API of the Auth Module.
 * Wires up the module and returns the mounted Express router.
 */
export function createAuthRouter(): Router {
  const { authController } = createAuthModule();
  return createAuthRoutes(authController);
}

/**
 * To create a v2 route export the follwoing and call it from routes.ts in app
 * 
    export function createAuthRouterV2(): Router {
      const { authControllerV2 } = createAuthModuleV2();
      return createAuthRoutesV2(authControllerV2); // Uses a new v2 route file
    }
 */
