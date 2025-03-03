// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";
import multer from "multer";

// I M P O R T:  F U N C T I O N S
import { objectIdValidator } from "../middleware/objectIdValidator.ts";
import { landingPageValidator } from "../middleware/landingPageValidator.ts";
import { validateRequest } from "../middleware/validator.ts";

// I M P O R T:  C O N T R O L L E R
import {
  getLandingPageContent,
  patchLandingPageContent,
} from "../controller/contentConroller.ts";

import { auth } from "../middleware/auth.ts";
import { admin } from "../middleware/admin.ts";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
import { uploadMedia, uploadAvatar } from "../services/media/multer.ts";
import { get } from "http";

// C R E A T E   R O U T E S
const router = express.Router();

// R O U T E S
router
  .route("/landingpage")
  .get(getLandingPageContent)
  .patch(landingPageValidator, validateRequest, patchLandingPageContent);

export default router;
