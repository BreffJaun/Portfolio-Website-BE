// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const landingPageValidator = [
  body("introduction")
    .notEmpty()
    .withMessage("Introduction has to be set!")
    .trim(),
  body("name").notEmpty().withMessage("Name has to be set!").trim(),
  body("connectingWords")
    .notEmpty()
    .withMessage("Set connecting words!")
    .trim(),
  body("jobTitle").notEmpty().withMessage("JobTitle has to be set!").trim(),
  body("description")
    .notEmpty()
    .withMessage("Description has to be set!")
    .trim(),
];
