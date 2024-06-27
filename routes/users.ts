// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";
import multer from "multer";

// I M P O R T:  F U N C T I O N S
import { objectIdValidator } from "../middleware/objectIdValidator.ts";
import {
  userValidator,
  userUpdateValidator,
} from "../middleware/userValidator.ts";
import { validateRequest } from "../middleware/validator.ts";

// I M P O R T:  C O N T R O L L E R
import {
  usersGetAll,
  usersPostUser,
  usersGetSpecific,
  usersPatchSpecific,
  usersDeleteSpecific,
  usersPostLogin,
  usersGetLogout,
  usersChecklogin,
  verifyEmail,
  forgotPassword,
  setNewPassword,
} from "../controller/usersController.ts";

import { auth } from "../middleware/auth.ts";
import { admin } from "../middleware/admin.ts";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
const upload = multer({ dest: "uploads/" });

// C R E A T E   R O U T E S
const router = express.Router();

// Authentication routes
router.route("/login").post(usersPostLogin);
router.route("/logout").get(usersGetLogout);
router.route("/checklogin").get(usersChecklogin);

// User management routes
router
  .route("/")
  .get(auth, admin, usersGetAll)
  .post(upload.single("avatar"), userValidator, validateRequest, usersPostUser);

router
  .route("/:id")
  .get(objectIdValidator, auth, usersGetSpecific)
  .put(
    objectIdValidator,
    auth,
    userUpdateValidator,
    validateRequest,
    usersPatchSpecific
  )
  .delete(objectIdValidator, auth, usersDeleteSpecific);

// Password management routes
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").post(setNewPassword);

// Email verification route
router.route("/verify/:token").get(verifyEmail);

export default router;
