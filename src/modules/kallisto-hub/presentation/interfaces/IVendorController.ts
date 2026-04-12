import { Request, Response } from "express";

export interface IVendorController {
  /**
   * Registers a new vendor in the system.
   */
  createVendor(req: Request, res: Response): Promise<void>;

  /**
   * Updates an existing vendor's profile.
   */
  updateVendor(req: Request, res: Response): Promise<void>;

  /**
   * Retrieves full details of a specific vendor.
   */
  getVendorDetails(req: Request, res: Response): Promise<void>;

  /**
   * Lists vendors with pagination and optional filtering.
   */
  getVendors(req: Request, res: Response): Promise<void>;
}
