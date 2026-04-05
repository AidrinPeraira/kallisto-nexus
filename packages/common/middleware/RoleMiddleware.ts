import { HttpStatus, UserRole } from "@/shared/enums";
import { AppError, ErrorCode } from "@/shared/errors";
import { AuthMessages } from "@/shared/messages";
import { TokenPayload } from "@/shared/types";
import { Request, Response, NextFunction } from "express";

/**
 * Creates a middleware that checks if the authenticated user has one of the allowed roles.
 * Note: This middleware works only after auth middleware has verified the token and added user details to req.user
 * @param allowedRoles - The roles that are allowed to access the route.
 * @returns A middleware function that checks the user's role.
 */
export function roleMiddleware(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user as TokenPayload | undefined;

    console.log(user);
    if (!user || !allowedRoles.includes(user.role as UserRole)) {
      console.log("Hit 4");
      throw new AppError(
        ErrorCode.AUTH_UNAUTHORIZED,
        AuthMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  };
}
