import express, { Application } from "express";
import { WinstonLogger } from "@packages/logger";
import {
  httpLogger,
  createErrorHandler,
  notFoundHandler,
} from "@packages/common/middleware";
import { createRouter } from "./routes";

/**
 * Creates and configures the Express application.
 * - Global middleware (JSON parsing, HTTP logging)
 * - Module routes mounted under /api
 * - 404 and global error handler (always last)
 */
export function createApp(): Application {
  const app = express();
  const logger = new WinstonLogger();

  // ── Global Middleware ──────────────────────────────────────────────────────
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(httpLogger);

  // ── Health Check ──────────────────────────────────────────────────────────
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // ── Module Routes ─────────────────────────────────────────────────────────
  app.use("/api", createRouter());

  // ── 404 Handler ───────────────────────────────────────────────────────────
  app.use(notFoundHandler);

  // ── Global Error Handler (must be last) ───────────────────────────────────
  app.use(createErrorHandler(logger));

  return app;
}
