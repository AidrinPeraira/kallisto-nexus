import { createBridgeModule } from "@src/modules/kallisto-bridge/bridge.module";
import { createOnboardingRoutes } from "@src/modules/kallisto-bridge/presentation/routers/OnboardingRouter";
import { Router } from "express";

export function createBridgeRouter(): Router {
  const { onboardingController } = createBridgeModule();
  const router = Router();

  // You can mount multiple sub-routers under bridge module here
  // Right now onboarding is main logic
  router.use("/onboarding", createOnboardingRoutes(onboardingController));

  return router;
}
