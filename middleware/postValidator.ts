// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const postValidator = [
  body("authordId").trim().escape(),
  body("authorName").trim().escape(),
  body("authorAvatar").trim().escape(),
  body("authorAction").trim().escape(),
  body("vibe")
    .notEmpty()
    .withMessage("Vibe has to be set! A short text with an Emoji")
    .trim()
    .escape(),
  body("articleTitle").optional().trim().escape(),
  body("articleContent")
    .notEmpty()
    .withMessage("Article content has to be set!")
    .trim()
    .escape(),
  body("articleImageSrc")
    .optional()
    // .isURL()
    // .withMessage("Article image must be a valid URL!")
    .trim(),
  body("articleLink")
    .optional()
    .isURL()
    .withMessage("Article link must be a valid URL!"),
];

// Validator für Updates
export const postUpdateValidator = [
  body("authordId").trim().escape(),
  body("authorName").trim().escape(),
  body("avatar").trim().escape(),
  body("authorAction").trim().escape(),
  // body("date")
  //   .notEmpty()
  //   .withMessage("Current date is set automatically!")
  //   .trim(),
  body("vibe")
    .notEmpty()
    .withMessage("Vibe has to be set! A short text with an Emoji")
    .trim()
    .escape(),
  body("articleTitle").optional().trim().escape(),
  body("articleContent")
    .notEmpty()
    .withMessage("Article content has to be set!")
    .trim()
    .escape(),
  body("articleImageSrc")
    .optional()
    .isURL()
    .withMessage("Article image must be a valid URL!")
    .trim(),
  body("articleLink")
    .optional()
    .isURL()
    .withMessage("Article link must be a valid URL!")
    .trim(),
];
