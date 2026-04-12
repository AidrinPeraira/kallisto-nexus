import { createAuthRouter } from "@src/modules/kallisto-auth";
import { createBridgeRouter } from "@src/modules/kallisto-bridge";
import { createHubRouter } from "@src/modules/kallisto-hub";
import { Router } from "express";

/**
 * Master Router — mounts all module routes.
 *
 * URL convention: /api/<module>/v1/*
 */
export function createRouter(): Router {
  const router = Router();

  // Auth Module
  router.use("/auth/v1", createAuthRouter());

  // Bridge Module
  router.use("/bridge/v1", createBridgeRouter());

  // Hub Module
  router.use("/hub/v1", createHubRouter());

  /**
   * to add additional v2 routes
      router.use("/auth/v2", createAuthRouterV2());
  */

  return router;
}
