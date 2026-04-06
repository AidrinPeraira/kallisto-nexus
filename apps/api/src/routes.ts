import { createAuthRouter } from "@src/modules/kallisto-auth";
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

  /**
   * to add additional v2 routes
      router.use("/auth/v2", createAuthRouterV2());
  */

  return router;
}
