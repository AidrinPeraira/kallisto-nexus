import { env } from "@packages/config/env";
import { HttpStatus } from "@packages/common/enums";
import { AppError, ErrorCode } from "@packages/common/errors";
import { AuthMessages } from "@packages/common/messages";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMidllewarre(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;

    console.log("Hit 1: ", authHeader);
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Hit 2");
      throw new AppError(
        ErrorCode.TOKEN_NOT_FOUND,
        AuthMessages.TOKEN_NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.slice(7);
    const payload = jwt.verify(token, env.AUTH_SECRET);

    (req as any).user = payload;
    next();
  } catch (error) {
    next(error);
  }
}
