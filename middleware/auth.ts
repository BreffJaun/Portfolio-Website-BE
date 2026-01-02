// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import "dotenv/config";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
import { CustomError } from "../types/classes";

// I M P O R T  &  D E C L A R E   B C R Y P T   K E Y
import { JWT_KEY } from "../config/config";

//========================

// AUTHORIZE A USER
export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    // If the token is not verified successfully, an error is thrown IMMEDIATELY and it goes into Catch!

    // BEGIN COOKIE CODE //
    const token = req.cookies?.loginCookie;
    if (!token) {
      return next(new CustomError("Not authenticated", 401));
    }
    const decodedToken = jwt.verify(token, JWT_KEY);
    // END COOKIE CODE //

    req.token = decodedToken;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new CustomError("Token expired", 401));
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new CustomError("Invalid token", 401));
    }
    next(err);
  }
}

export const decodeToken = (token: string, JWT_KEY: string) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof err.message === "string"
    ) {
      throw new CustomError(err.message, 400);
    } else {
      throw new CustomError("An unexpected error occurred.", 500);
    }
  }
};
