// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs/promises";
import { Model, Types } from "mongoose";
import type { NextFunction } from "express";
import type { Post } from "../../types/interfaces";

// I M P O R T:  F U N C T I O N S
import { nextCustomError } from "../../middleware/errorhandler";

// I M P O R T:  E N V  O P T I O N S
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../config/config";

// ========================

// D E F I N E   C L O U D I N A R Y   C O N F I G U R A T I O N
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// D E F I N E   C L O U D I N A R Y   I N S T A N C E
export const addFile = async (
  file: Express.Multer.File,
  model: Model<any>,
  postId: Types.ObjectId,
  next: NextFunction
) => {
  if (file) {
    const allowedMimetypes = [
      "png",
      "jpg",
      "jpeg",
      "tiff",
      "gif",
      "bmp",
      "mp4",
      "mov",
      "wmv",
      "avi",
      "mkv",
      "flv",
      "octet-stream",
    ];

    if (!file || !allowedMimetypes.some((el) => file.mimetype.includes(el))) {
      return nextCustomError("Unsupported file type", 400, next);
    }

    try {
      const absFilePath = `${__dirname}/../${file.path}`;
      const response = await cloudinary.uploader.upload(absFilePath, {
        resource_type: "auto",
        use_filename: true,
      });

      await unlink(absFilePath);

      await model.findByIdAndUpdate(postId, {
        media: response.secure_url,
        contentType: file.mimetype,
      });
    } catch (err) {
      return nextCustomError("Error uploading file to Cloudinary", 500, next);
    }
  }
};
