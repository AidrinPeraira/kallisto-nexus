import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

/**
 * This is a reusable validation middleware
 * Can be used to validate input data in all modules
 * @param schema Zod schema
 * @returns
 */
export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
