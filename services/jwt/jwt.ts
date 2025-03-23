// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import "dotenv/config";
import jwt from "jsonwebtoken";

// I M P O R T:  T Y P E S
import { CustomError } from "../../types/classes";
import type { UserDocument } from "../../models/userModel";

// I M P O R T:  E N V  O P T I O N S
import { JWT_KEY, JWT_EXPIRATION } from "../../config/config";

// ======================================================

// C R E A T E   J W T   V E R I F Y   T O K E N
export const createVerifyToken = (user: UserDocument) => {
  try {
    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, JWT_KEY, {
      expiresIn: JWT_EXPIRATION,
    });
    return jwtToken;
  } catch (error) {
    throw new CustomError("Failed to create JWT token", 500);
  }
};

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
