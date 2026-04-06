import { errorResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { Request, Response, NextFunction } from "express";

/**
 * To provide a structured response as json for not found routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .json(
      errorResponse(`Route ${req.originalUrl} not found`, "ROUTE_NOT_FOUND"),
    );
};
