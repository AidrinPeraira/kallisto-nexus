import { Request, Response } from "express";

export interface IOnboardingController {
  //----- identity -----
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

  //----- addres -----

  /**
   * Common method for adding address for all service providers
   */
  addSPAddress(req: Request, res: Response): Promise<void>;

  //----- services -----

  /**
   * This function adds services and service area for all service providers
   */
  addSPServices(req: Request, res: Response): Promise<void>;

  /**
   * This function adds service areas for all service providers
   */
  addSPServiceAreas(req: Request, res: Response): Promise<void>;

  //----- Credentials ------

  addOrgSPCredentials(req: Request, res: Response): Promise<void>;
  addProfessionalSPCredentials(req: Request, res: Response): Promise<void>;
  addContractorSPCredentials(req: Request, res: Response): Promise<void>;

  //----- representative ----

  addOrgRepresentative(req: Request, res: Response): Promise<void>;

  //----- Bank Details ------
}
