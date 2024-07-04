// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";

// I M P O R T:  F U N C T I O N S
import { objectIdValidator } from "../middleware/objectIdValidator.ts";
import {
  postValidator,
  postUpdateValidator,
} from "../middleware/postValidator.ts";
import { validateRequest } from "../middleware/validator.ts";
import { auth } from "../middleware/auth.ts";
import { uploadSingleMedia } from "../services/media/multer.ts";

// I M P O R T:  C O N T R O L L E R
import {
  postsGetAll,
  createPost,
  postPatch,
  postDelete,
} from "../controller/postsController.ts";

// ========================

// C R E A T E   R O U T E S
const router = express.Router();

// User management routes
router
  .route("/")
  .get(auth, postsGetAll)
  .post(uploadSingleMedia, postValidator, validateRequest, createPost);

router
  .route("/:id")
  .patch(
    uploadSingleMedia,
    objectIdValidator,
    auth,
    postUpdateValidator,
    validateRequest,
    postPatch
  )
  .delete(objectIdValidator, auth, postDelete);

export default router;
