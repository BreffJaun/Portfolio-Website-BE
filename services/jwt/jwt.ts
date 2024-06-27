// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import "dotenv/config";
import jwt from "jsonwebtoken";

// I M P O R T:  T Y P E S
import { CustomError } from "../../types/classes.ts";

// I M P O R T:  E N V  O P T I O N S
import { JWT_KEY, JWT_EXPIRATION } from "../../config/config.ts";
import type { userFromDb } from "../../types/hybrids.d.ts";

// ======================================================

// C R E A T E   J W T   V E R I F Y   T O K E N
export const createVerifyToken = (user: typeof userFromDb) => {
  try {
    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, JWT_KEY, {
      expiresIn: JWT_EXPIRATION,
    });
    return jwtToken;
  } catch (error) {
    throw new CustomError("Failed to create JWT token", 500);
  }
};
