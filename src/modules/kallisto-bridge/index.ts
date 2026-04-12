import { UserRole } from "@packages/common/enums";
import { authMidllewarre, roleMiddleware } from "@packages/common/middleware";
import { createBridgeModule } from "@src/modules/kallisto-bridge/bridge.module";
import { createOnboardingRoutes } from "@src/modules/kallisto-bridge/presentation/routers/OnboardingRouter";
import { createPortfolioRoutes } from "@src/modules/kallisto-bridge/presentation/routers/PortfolioRouter";
import { createProfileRoutes } from "@src/modules/kallisto-bridge/presentation/routers/ProfileRouter";
import { Router } from "express";

export function createBridgeRouter(): Router {
  const { onboardingController, portfolioController, profileController } = createBridgeModule();
  const router = Router();

  // You can mount multiple sub-routers under bridge module here
  // Right now onboarding is main logic
  router.use(
    "/onboarding",
    authMidllewarre,
    roleMiddleware(
      UserRole.SP_CONTRACTOR,
      UserRole.SP_PROFESSIONAL,
      UserRole.SP_ORGANIZATION,
    ),
    createOnboardingRoutes(onboardingController),
  );

  router.use(
    "/portfolio",
    authMidllewarre,
    roleMiddleware(
      UserRole.SP_CONTRACTOR,
      UserRole.SP_PROFESSIONAL,
      UserRole.SP_ORGANIZATION,
    ),
    createPortfolioRoutes(portfolioController),
  );

  router.use(
    "/profile",
    authMidllewarre,
    roleMiddleware(
      UserRole.SP_CONTRACTOR,
      UserRole.SP_PROFESSIONAL,
      UserRole.SP_ORGANIZATION,
    ),
    createProfileRoutes(profileController),
  );

  return router;
}

