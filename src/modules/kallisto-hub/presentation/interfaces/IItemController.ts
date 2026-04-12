import { Request, Response } from "express";

export interface IItemController {
  /**
   * Creates a new material blueprint (item).
   */
  createItem(req: Request, res: Response): Promise<void>;

  /**
   * Updates an existing material blueprint.
   */
  updateItem(req: Request, res: Response): Promise<void>;

  /**
   * lists available material blueprints with pagination.
   */
  getItems(req: Request, res: Response): Promise<void>;
}
