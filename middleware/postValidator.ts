// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const postValidator = [
  body("authorId").notEmpty().withMessage("Author ID is required!").trim(),
  body("authorName").trim().escape(),
  body("authorAvatar").trim().escape(),
  body("authorAction").trim().escape(),
  body("vibe").optional().trim(),
  body("articleTitle").optional().trim().escape(),
  body("articleContent")
    .notEmpty()
    .withMessage("Article content has to be set!")
    .trim(),
  body("articleImageSrc").optional().trim(),
  body("articleLink")
    .optional() // Feld ist optional
    .custom((value) => {
      if (value === "") return true;
      return /^https?:\/\/[^\s]+$/.test(value);
    })
    .withMessage("Article link must be a valid URL or empty!")
    .trim(),
];

// Validator für Updates
export const postUpdateValidator = [
  body("authorId").notEmpty().withMessage("Author ID is required!").trim(),
  body("authorName").trim().escape(),
  body("avatar").trim().escape(),
  body("authorAction").trim().escape(),
  body("vibe").optional().trim(),
  body("articleTitle").optional().trim().escape(),
  body("articleContent")
    .notEmpty()
    .withMessage("Article content has to be set!")
    .trim(),
  body("articleImageSrc")
    .optional()
    .isURL()
    .withMessage("Article image must be a valid URL!")
    .trim(),

  body("articleLink")
    .optional() // Feld ist optional
    .isURL()
    .withMessage("Article link must be a valid URL!")
    .trim(),
];
