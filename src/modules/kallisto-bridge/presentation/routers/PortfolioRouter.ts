import { Router } from "express";
import { PortfolioController } from "@src/modules/kallisto-bridge/presentation/interfaces/IPortfolioController";
import { validate } from "@packages/common/middleware";
import {
  CreatePortfolioSchema,
  AddPortfolioProjectSchema,
} from "@src/modules/kallisto-bridge/presentation/validators/PortfolioValidators";

export function createPortfolioRoutes(portfolioController: PortfolioController) {
  const router = Router();

  router.post(
    "/create",
    validate(CreatePortfolioSchema),
    portfolioController.createPortfolio.bind(portfolioController),
  );

  router.post(
    "/project",
    validate(AddPortfolioProjectSchema),
    portfolioController.addPortfolioProject.bind(portfolioController),
  );

  return router;
}
