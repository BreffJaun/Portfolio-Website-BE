// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const stackTechnologiesValidator = [
  body("name")
    .notEmpty()
    .withMessage("Headline has to be set!")
    .trim()
    .optional(),
  body("img").trim(),
];
