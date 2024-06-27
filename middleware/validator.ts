// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

// C R E A T E   V A L I D A T O R
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(validationErrors.array());
  }
  next();
};
