// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const postValidator = [
  body("authorAction")
    .withMessage("Just an Emoji which describes your action!")
    .trim()
    .escape(),
  body("date").notEmpty().withMessage("Current date has to be set!").trim(),
  body("mood")
    .notEmpty()
    .withMessage("Mood has to be set! A short text with an Emoji")
    .trim()
    .escape(),
  body("articleTitle")
    .withMessage("Title ist not required, but recommended!")
    .trim()
    .escape(),
  body("articleContent")
    .notEmpty()
    .withMessage("Article content has to be set!")
    .trim()
    .escape(),
  body("articleImageSrc")
    .notEmpty()
    .withMessage("Article image URL is not required, but recommended!")
    .isURL()
    .withMessage("Article image must be a valid URL!")
    .trim(),
  body("articleLink")
    .optional()
    .isURL()
    .withMessage(
      "Article link is not required, but recommended. Must be a valid URL!"
    )
    .trim(),
];

// Validator für Updates
export const postUpdateValidator = [
  body("authorAction")
    .optional()
    .withMessage("Just an Emoji which describes your action!")
    .trim()
    .escape(),
  body("mood")
    .optional()
    .notEmpty()
    .withMessage("Mood has to be set! A short text with an Emoji")
    .trim()
    .escape(),
  body("articleTitle")
    .optional()
    .withMessage("Title is not required, but recommended!")
    .trim()
    .escape(),
  body("articleContent")
    .optional()
    .notEmpty()
    .withMessage("Article content has to be set!")
    .trim()
    .escape(),
  body("articleImageSrc")
    .optional()
    .notEmpty()
    .withMessage("Article image URL is not required, but recommended!")
    .isURL()
    .withMessage("Article image must be a valid URL!")
    .trim(),
  body("articleLink")
    .optional()
    .isURL()
    .withMessage(
      "Article link is not required, but recommended. Must be a valid URL!"
    )
    .trim(),
  body("date").custom((value: any, { req }: { req: any }) => {
    if (value !== undefined) {
      throw new Error("Date cannot be modified after it is set.");
    }
    return true;
  }),
];

// normalize() => changes all chars to lowerCase
