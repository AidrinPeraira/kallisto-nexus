import { createHandsModule } from "./hands.module";
import { createOnboardingRoutes } from "./presentation/routes/SAOnboardingRouter";
import { Router } from "express";

/**
 * Main entry point for the Hands Module.
 * Initializes the module and returns the composed router.
 */
export function createHandsRouter(): Router {
  const { onboardingController } = createHandsModule();

  const router = Router();

  // Mount onboarding routes
  router.use("/", createOnboardingRoutes(onboardingController));

  return router;
}

// Export other necessary parts if needed for internal module usage
export * from "./domain/entities/ServiceAssociateEntity";
export * from "./application/dto/usecases/ServiceAssociateDTO";
