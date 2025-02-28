// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { query, param } from "express-validator";

// C R E A T E   V A L I D A T O R
export const objectIdValidator = [
  // query("objectId")
  param("id")
    .notEmpty()
    .withMessage("Object ID must be provided")
    .isMongoId()
    .withMessage("Invalid Object ID"),
];
