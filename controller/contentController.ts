// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
// import type { PatchUser } from "../types/interfaces";
import { Types } from "mongoose";

// I M P O R T:  F U N C T I O N S
import UserModel from "../models/userModel.ts";
import LandingPageModel from "../models/landingPageModel.ts";
import MySelfModel from "../models/mySelfModel.ts";
import {
  StackDescriptionModel,
  StackTechnologiesModel,
} from "../models/stackModels.ts";
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

// GET MySelfContent ✅
export const getMySelfContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const content = await MySelfModel.findOne();
    if (!content) {
      return nextCustomError("Content not found!", 404, next);
    }
    res.status(200).json({ content: content });
  } catch (err) {
    next(err);
  }
};

// PATCH MySelfContent ✅
export const patchMySelfContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentMySelfContent = await MySelfModel.findOne();
    const id = currentMySelfContent?._id;

    if (!currentMySelfContent) {
      return nextCustomError("No content found!", 404, next);
    }

    const newMySelfContent = await MySelfModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({ content: newMySelfContent });
  } catch (err) {
    next(err);
  }
};

// GET StackContent ✅
export const getStackContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stackDescription = await StackDescriptionModel.findOne();
    const stackTechnologies = await StackTechnologiesModel.find();
    if (!stackDescription || !stackTechnologies) {
      return nextCustomError("Content not found!", 404, next);
    }

    const completeContent = {
      headline: stackDescription.headline,
      description: stackDescription.description,
      stack: stackTechnologies,
    };

    res.status(200).json({ content: completeContent });
  } catch (err) {
    next(err);
  }
};

// PATCH StackDescription ✅
export const patchStackDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentStackDescription = await StackDescriptionModel.findOne();
    const id = currentStackDescription?._id;

    if (!currentStackDescription) {
      return nextCustomError("No content found!", 404, next);
    }

    const updatedStackDescription =
      await StackDescriptionModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
    res.status(200).json({ content: updatedStackDescription });
  } catch (err) {
    next(err);
  }
};

// POST StackTechnologies ✅
export const postStackTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("Multer Output:", req.file);
    // console.log("Request Body:", req.body);
    if (!req.body.name || !req.file) {
      return res.status(400).json({ message: "Name or image file is missing" });
    }
    const newStackItem = {
      name: req.body.name,
      img: req.file.path,
    };
    const createdStackItem = await StackTechnologiesModel.create(newStackItem);
    const id = createdStackItem._id;

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      await addFile(
        req.file,
        StackTechnologiesModel,
        id as Types.ObjectId,
        "img",
        next
      );
    }
    // MEDIA UPLOAD END //

    res.status(201).json({ content: createdStackItem });
  } catch (err) {
    next(err);
  }
};

// PATCH StackTechnologies ✅
export const patchStackTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const currentStackItem = await StackTechnologiesModel.findById(id);
    // console.log("newData: ", newData);

    let updatedStackItem = await StackTechnologiesModel.findByIdAndUpdate(
      id,
      newData,
      {
        new: true,
      }
    );

    // CHECK IF ITEM EXISTS
    if (!currentStackItem) {
      return nextCustomError("No Stack Item found!", 404, next);
    }

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      // console.log("req.file: ", req.file);
      if (currentStackItem.img) {
        await deleteFileFromCloudinary(currentStackItem.img, next);
      }
      await addFile(
        req.file,
        StackTechnologiesModel,
        currentStackItem._id as Types.ObjectId,
        "img",
        next
      );
    }
    // MEDIA UPLOAD END //

    updatedStackItem = await StackTechnologiesModel.findById(id);
    // console.log("updatedStackItem: ", updatedStackItem);
    res.status(201).json({ content: updatedStackItem });
  } catch (err) {
    next(err);
  }
};

// DELETE StackTechnologies ✅
export const deleteStackTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentStackItem = await StackTechnologiesModel.findByIdAndDelete(id);
    if (!currentStackItem) {
      return nextCustomError("No Stack Item found!", 404, next);
    }

    // MEDIA DELETE ONLY IF IMAGE EXISTS
    if (currentStackItem.img) {
      await deleteFileFromCloudinary(currentStackItem.img, next);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
