// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const certificatesValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title has to be set!")
    .trim()
    .optional(),
  body("img").trim(),
  // body("img").custom((_, { req }) => {
  //   if (!req.file) {
  //     throw new Error("Certificate image is required");
  //   }
  //   return true;
  // }),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["hard-skills", "soft-skills", "courses", "events"])
    .withMessage("Invalid category"),
];
