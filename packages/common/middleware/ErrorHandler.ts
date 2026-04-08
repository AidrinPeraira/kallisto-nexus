import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ILogger } from "@packages/logger/ILogger";
import { errorResponse } from "@packages/common/responses";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";

export const createErrorHandler = (logger: ILogger) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Hitttt");
    // 1. Handle Known Application Errors
    if (err instanceof AppError) {
      logger.error(`AppError: ${err.message}`, {
        path: req.path,
        code: err.code,
        details: err.details,
      });

      return res
        .status(err.httpStatus)
        .json(errorResponse(err.message, err.code, err.details));
    }

    // 2. Handle Schema Validation Errors (Zod)
    if (err instanceof ZodError) {
      logger.warn("Validation error", {
        path: req.path,
        errors: err.issues,
      });

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(
          errorResponse(
            "Validation failed",
            ErrorCode.VALIDATION_ERROR,
            err.issues,
          ),
        );
    }

    // 3. Handle Database Errors (e.g. Prisma or Postgres)
    if (
      err.name === "PrismaClientKnownRequestError" ||
      (err.code && typeof err.code === "string" && err.code.startsWith("P")) ||
      (err.code &&
        typeof err.code === "string" &&
        err.code.length === 5 &&
        !isNaN(Number(err.code.slice(0, 2))))
    ) {
      logger.error("Database error", {
        path: req.path,
        code: err.code,
        meta: err.meta || err.detail || null,
      });

      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = "Database error occurred";

      // Prisma Unique constraint violation or Postgres Unique violation
      if (err.code === "P2002" || err.code === "23505") {
        statusCode = HttpStatus.CONFLICT;
        message = "Unique constraint failed";
      }
      // Prisma Record not found
      else if (err.code === "P2025") {
        statusCode = HttpStatus.NOT_FOUND;
        message = "Record not found";
      }

      return res.status(statusCode).json(
        errorResponse(message, ErrorCode.INTERNAL_SERVER_ERROR, {
          dbCode: err.code,
          meta: err.meta || err.detail,
        }),
      );
    }

    // 4. Handle Any Other Unhandled Errors
    logger.error("Unhandled error", {
      message: err.message,
      stack: err.stack,
      path: req.path,
    });

    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse("Internal server error", ErrorCode.INTERNAL_SERVER_ERROR),
      );
  };
};
