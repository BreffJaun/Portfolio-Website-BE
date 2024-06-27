// I M P O R T   D E P E N D E N C I E S
import { Types } from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin: boolean;
  isVerified: boolean;
  isVerifiedTCP: boolean;
}

export interface PatchUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
