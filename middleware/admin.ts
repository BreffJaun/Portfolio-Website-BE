// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
import { CustomError } from "../types/classes.ts";

// I M P O R T:  F U N C T I O N S
import UserModel from "../models/userModel.ts";

//========================

// CHECK IF USER IS ADMIN
export async function admin(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserModel.findById(req.token.userId);
    if (!user || !user.isAdmin) {
      const err = new CustomError("No administrator rights!", 400);
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
}
