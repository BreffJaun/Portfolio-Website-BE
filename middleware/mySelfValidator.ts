// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const mySelfValidator = [
  body("headline")
    .notEmpty()
    .withMessage("Headline has to be set!")
    .trim()
    .optional(),
  body("motto")
    .notEmpty()
    .withMessage("Motto has to be set!")
    .trim()
    .optional(),
  body("connectingWords")
    .notEmpty()
    .withMessage("Connecting words have to be set!")
    .trim()
    .optional(),
  body("description")
    .isObject()
    .withMessage("Description must be an object")
    .optional(),
  body("description.paragraph1")
    .notEmpty()
    .withMessage("Paragraph 1 has to be set!")
    .trim()
    .optional(),
  body("description.paragraph2")
    .notEmpty()
    .withMessage("Paragraph 2 has to be set!")
    .trim()
    .optional(),
  body("description.paragraph3")
    .notEmpty()
    .withMessage("Paragraph 3 has to be set!")
    .trim()
    .optional(),
];
