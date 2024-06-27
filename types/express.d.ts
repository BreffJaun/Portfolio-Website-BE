// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { Request } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    token?: JwtPayload | string; // Token ist optional und kann ein JwtPayload oder ein string sein
  }
}
