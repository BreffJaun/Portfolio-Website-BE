// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
// import type { PatchUser } from "../types/interfaces";
import { Types } from "mongoose";

// I M P O R T:  F U N C T I O N S
import LandingPageModel from "../models/landingPageModel.ts";
import UserModel from "../models/userModel.ts";
import type { UserDocument } from "../models/userModel.ts";
import type { PatchUser } from "../types/interfaces";
import { sendMail } from "../services/nodeMailer/nodeMailerConfig.ts";
// import { decodeToken } from "../middleware/auth.ts";
import { nextCustomError } from "../middleware/errorhandler.ts";
import {
  addFile,
  extractPublicIdFromUrl,
  deleteFileFromCloudinary,
} from "../services/media/cloudinary.ts";
import { createVerifyToken } from "../services/jwt/jwt.ts";
import { decodeToken } from "../middleware/auth.ts";

// I M P O R T:  E N V  O P T I O N S
import {
  JWT_KEY,
  BE_HOST,
  FE_HOST,
  cookieAge,
  allowedMails,
} from "../config/config.ts";
import { clear } from "console";

//========================

// GET LandingPage ✅
export const getLandingPageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const landingPageContent = await LandingPageModel.findOne();
    if (!landingPageContent) {
      return nextCustomError("No landing page content found!", 404, next);
    }
    res.status(200).json({ content: landingPageContent });
  } catch (err) {
    next(err);
  }
};

// PATCH (Update)LandingPage ✅
export const patchLandingPageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentLPContent = await LandingPageModel.findOne();
    const id = currentLPContent?._id;

    if (!currentLPContent) {
      return nextCustomError("No landing page content found!", 404, next);
    }

    const updatedLPContent = await LandingPageModel.findByIdAndUpdate(
      id,
      newData,
      {
        new: true,
      }
    );
    res.status(200).json({ content: updatedLPContent });
  } catch (err) {
    next(err);
  }
};
