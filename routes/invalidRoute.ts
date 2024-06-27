// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
import { CustomError } from "../types/classes.ts";

// C R E A T E  R O U T E S

const invalidRoute = (req: Request, res: Response, next: NextFunction) => {
  next(
    new CustomError(
      `Combination of path "${req.originalUrl}" and method "${req.method}" not found.`,
      404
    )
  );
};

export default invalidRoute;
