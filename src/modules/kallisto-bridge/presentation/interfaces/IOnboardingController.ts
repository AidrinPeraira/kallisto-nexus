import { Request, Response } from "express";

export interface IOnboardingController {
  /**
   * This function creates an organization's service provider identity
   */
  addOrgSPIdentity(req: Request, res: Response): Promise<void>;

  /**
   * This function creates a professional's service provider identity
   */
  addProfessionalSPIdentity(req: Request, res: Response): Promise<void>;

  /**
   * This function creates a contractor's service provider identity
   */
  addContractorSPIdentity(req: Request, res: Response): Promise<void>;
}
