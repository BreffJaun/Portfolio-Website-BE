// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const userValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email has to be set!")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password has to bet set!")
    .trim()
    .isStrongPassword()
    .withMessage("Password isn't safe enough!")
    .isLength({ min: 8 }),
  body("userName")
    .notEmpty()
    .withMessage("Username has to be set!")
    .trim()
    .isLength({ min: 3 }),
  body("avatar").trim(),
];

export const userUpdateValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email has to be set!")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password has to bet set!")
    .trim()
    .isStrongPassword()
    .withMessage("Password isn't safe enough!")
    .isLength({ min: 8 }),
];

// normalize() => changes all chars to lowerCase
