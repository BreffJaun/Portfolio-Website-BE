// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";
import multer from "multer";

// I M P O R T:  F U N C T I O N S
import { objectIdValidator } from "../middleware/objectIdValidator.ts";
import { feedDescriptionValidator } from "../middleware/feedDescriptionValidator.ts";
import {
  postValidator,
  postUpdateValidator,
} from "../middleware/postValidator.ts";
import { validateRequest } from "../middleware/validator.ts";

// I M P O R T:  C O N T R O L L E R
import {
  getFeedDescription,
  patchFeedDescription,
  getPosts,
  createPost,
  deletePost,
  editPost,
} from "../controller/feedController.ts";

import { auth } from "../middleware/auth.ts";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
import {
  uploadMedia,
  uploadAvatar,
  uploadFeedProfileImg,
  uploadFeedTitleImg,
  uploadPostMedia,
  uploadFeedImages,
} from "../services/media/multer.ts";

// C R E A T E   R O U T E S
const router = express.Router();

// R O U T E S
router
  .route("/")
  .get(getFeedDescription)
  .patch(
    uploadFeedImages,
    feedDescriptionValidator,
    validateRequest,
    patchFeedDescription
  );

router
  .route("/post")
  .get(getPosts)
  .post(uploadPostMedia, postValidator, validateRequest, createPost);

router
  .route("/post/:id")
  .delete(objectIdValidator, deletePost)
  .patch(
    objectIdValidator,
    uploadPostMedia,
    postValidator,
    validateRequest,
    editPost
  );

export default router;
