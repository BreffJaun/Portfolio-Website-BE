// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { Model, Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { PatchUser } from "../types/interfaces";

// I M P O R T:  F U N C T I O N S
import PostModel from "../models/feedModels.ts";
import type { Post } from "../types/interfaces";
// import UserModel from "../models/userModel.ts";
import { decodeToken } from "../middleware/auth.ts";
import { nextCustomError } from "../middleware/errorhandler.ts";
import { addFile } from "../services/media/cloudinary.ts";

// I M P O R T:  E N V  O P T I O N S
import { JWT_KEY, BE_HOST, cookieAge } from "../config/config.ts";
import { createVerifyToken } from "../services/jwt/jwt.ts";

//========================

// GET List of all posts
export const postsGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await PostModel.find());
  } catch (err) {
    next(err);
  }
};

// POST (Add) a new Post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPost = JSON.parse(req.body.data);
    const createdPost = await PostModel.create(newPost);

    // POSTIMAGE IMPLEMENT BEGIN //
    if (req.file) {
      // INSERT (
      // req.file,
      // needed Model,
      // associated type,
      // name of attribute where it will be saved in the model,
      // next
      // );
      await addFile(
        req.file,
        PostModel as Model<Post>,
        createdPost._id,
        "articleImageSrc",
        next
      );
    }
    // POSTIMAGE IMPLEMENT END //
    console.log("Created Post:", createdPost);

    res.status(201).json({
      message: "Created post successfully",
      data: createdPost,
      status: true,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH (Update) specific Post
export const postPatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // _id: Types.ObjectId;
    // avatar: string;
    // authorAction: string;
    // date: string;
    // mood: string;
    // articleTitle: string;
    // articleContent: string;
    // articleImageSrc: string;
    // articleLink?: string;
    const { id } = req.params;
    const newPostData = JSON.parse(req.body.data);
    const post = await PostModel.findById(id);

    const editedPost = await PostModel.findByIdAndUpdate(id, newPostData, {
      new: true,
    });

    // POSTIMAGE IMPLEMENT BEGIN //
    if (req.file) {
      // INSERT (
      // req.file,
      // needed Model,
      // associated type,
      // name of attribute where it will be saved in the model,
      // next
      // );
      await addFile(
        req.file,
        PostModel as Model<Post>,
        id,
        "articleImageSrc",
        next
      );
    }
    // POSTIMAGE IMPLEMENT END //
    // console.log("Created Post:", createdPost);

    restOfTheTeam.map(async (member) => {
      const notification = await NotificationModel.create({
        receiver: member,
        notText:
          editedStone.kind === "stepstone"
            ? `${userName} edited a stepstone in ${project.name}`
            : editedStone.kind === "milestone"
            ? `${userName} edited a milestone in ${project.name}`
            : `${userName} edited the endstone of ${project.name}`,
      });
      await UserModel.findByIdAndUpdate(member, {
        $push: { notifications: notification._id },
      });
    });
    res.status(201).json({
      message: "your stone is successfully updated",
      status: true,
      data: editedStone,
    });
  } catch (error) {
    next();
  }
};

// DELETE specific Post
export const postDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.params.id !== req.token.userId) {
      nextCustomError("Not Authorized to delete this user!", 401, next);
    }

    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      nextCustomError("User not found!", 404, next);
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
};
