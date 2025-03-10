// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const projectsValidator = [
  body("order").notEmpty().withMessage("Order has to be set!"),
  // .isNumeric()
  // .withMessage("Order has to be a number!"),

  body("img").trim(),

  body("title").notEmpty().withMessage("Title has to be set!").trim(),

  body("link").notEmpty().withMessage("Link has to be set!").trim(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description has to be a string!")
    .trim(),

  body("tags").notEmpty().withMessage("Tags have to be set!"),
  // .isArray()
  // .withMessage("Tags have to be an array!"),
];
