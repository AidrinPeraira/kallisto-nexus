import { Request, Response } from "express";

export interface IProductController {
  /**
   * Adds a new product listing for a vendor and an item.
   */
  addVendorProduct(req: Request, res: Response): Promise<void>;

  /**
   * Updates an existing product listing (price, stock, etc).
   */
  updateVendorProduct(req: Request, res: Response): Promise<void>;

  /**
   * Retrieves products for a specific vendor.
   */
  getVendorProducts(req: Request, res: Response): Promise<void>;

  /**
   * Global product listing across all vendors.
   */
  getProducts(req: Request, res: Response): Promise<void>;
}
