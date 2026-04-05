import { Request, Response } from "express";

export interface IAuthController {
  registerUser(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<void>;
  verifyEmail(req: Request, res: Response): Promise<void>;
  resendVerificationEmail(req: Request, res: Response): Promise<void>;
  refreshToken(req: Request, res: Response): Promise<void>;
}
