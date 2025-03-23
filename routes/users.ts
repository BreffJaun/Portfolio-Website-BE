// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";
import multer from "multer";

// I M P O R T:  F U N C T I O N S
import { objectIdValidator } from "../middleware/objectIdValidator";
import {
  userValidator,
  userUpdateValidator,
} from "../middleware/userValidator";
import { validateRequest } from "../middleware/validator";

// I M P O R T:  C O N T R O L L E R
import {
  usersGetAll,
  usersPostUser,
  // usersGetSpecific,
  usersPatchSpecific,
  // usersDeleteSpecific,
  usersPostLogin,
  usersGetLogout,
  usersChecklogin,
  verifyEmail,
  forgotPassword,
  verifyResetToken,
  setNewPassword,
} from "../controller/usersController";

import { auth } from "../middleware/auth";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
import { uploadMedia, uploadAvatar } from "../services/media/multer";

// C R E A T E   R O U T E S
const router = express.Router();

// Authentication routes
router
  .route("/register")
  .post(uploadAvatar, userValidator, validateRequest, usersPostUser);
router.route("/login").post(usersPostLogin);
router.route("/logout").get(usersGetLogout);
router.route("/checklogin").get(usersChecklogin);

// Email verification route
router.route("/verify/:token").get(verifyEmail);

// User management routes
router.route("/").get(auth, usersGetAll);

router
  .route("/:id")
  // .get(objectIdValidator, auth, usersGetSpecific)
  .patch(
    uploadAvatar,
    objectIdValidator,
    auth,
    userUpdateValidator,
    validateRequest,
    usersPatchSpecific
  );
// .delete(objectIdValidator, auth, usersDeleteSpecific);

// Password management routes
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").get(verifyResetToken);
router.route("/setnewpassword").post(setNewPassword);

export default router;
