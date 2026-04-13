import { Request, Response } from "express";

export interface IOnboardingController {
  addContractorSAIdentity(req: Request, res: Response): Promise<void>;
  addWorkerSAIdentity(req: Request, res: Response): Promise<void>;
  addSAAddress(req: Request, res: Response): Promise<void>;
  addContractorSASkills(req: Request, res: Response): Promise<void>;
  addWorkerSASkills(req: Request, res: Response): Promise<void>;
  addSACredentials(req: Request, res: Response): Promise<void>;
  addSABankDetails(req: Request, res: Response): Promise<void>;
  addSAServiceAreas(req: Request, res: Response): Promise<void>;
  getSAProfile(req: Request, res: Response): Promise<void>;
}
