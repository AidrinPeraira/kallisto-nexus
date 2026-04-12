import { Request, Response } from "express";

export interface IProfileController {
  /**
   * Returns the complete profile of the authenticated service provider.
   */
  getProfile(req: Request, res: Response): Promise<void>;
}
