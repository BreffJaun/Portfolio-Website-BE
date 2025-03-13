// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { body } from "express-validator";

// C R E A T E   V A L I D A T O R
export const feedDescriptionValidator = [
  body("feed_title_img").trim(),
  body("feed_Profile_img").trim(),
  body("ghLink").notEmpty().withMessage("GitHub Link has to be set!").trim(),
  body("fullName").notEmpty().withMessage("Full Name has to be set!").trim(),
  body("statement")
    .notEmpty()
    .withMessage(
      "Please set a statement which describes your point of you on coding!"
    )
    .trim(),
  body("jobTitle").notEmpty().withMessage("Job Title has to be set!").trim(),
  body("about")
    .notEmpty()
    .withMessage("Tell us a little more about your Job")
    .trim(),
];
