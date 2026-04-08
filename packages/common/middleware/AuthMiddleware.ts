import { env } from "@packages/config/env";
import { HttpStatus, TokenType } from "@packages/common/enums";
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

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(
        ErrorCode.TOKEN_NOT_FOUND,
        AuthMessages.TOKEN_NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.slice(7);
    const payload = jwt.verify(token, env.AUTH_SECRET);
    if ((payload as any).tokenType !== TokenType.ACCESS) {
      throw new AppError(
        ErrorCode.TOKEN_INVALID,
        AuthMessages.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    (req as any).user = payload;
    req.body.userId = (payload as any).userId;
    next();
  } catch (error) {
    next(error);
  }
}
