import { Request, Response } from "express";

export interface PortfolioController {
  /**
   * This function creates a portfolio for a service provider and adds first project
   */
  createPortfolio(req: Request, res: Response): Promise<void>;

  /**
   * This function adds a project to a service provider's portfolio
   */
  addPortfolioProject(req: Request, res: Response): Promise<void>;
}
