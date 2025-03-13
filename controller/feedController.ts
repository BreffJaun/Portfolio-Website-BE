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
import {
  ProjectsModel,
  ProjectDescriptionModel,
} from "../models/projectModels.ts";
import { FeedModel, PostModel } from "../models/feedModels.ts";

import { nextCustomError } from "../middleware/errorhandler.ts";
import {
  addFile,
  deleteFileFromCloudinary,
} from "../services/media/cloudinary.ts";
import { decodeHtmlEntities } from "../services/utils/utils.ts";

// I M P O R T:  E N V  O P T I O N S
import {
  JWT_KEY,
  BE_HOST,
  FE_HOST,
  cookieAge,
  allowedMails,
} from "../config/config.ts";
import { clear } from "console";
import e from "express";

//========================

// GET FeedDescription ✅
export const getFeedDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feedDescription = await FeedModel.findOne();
    if (!feedDescription) {
      return nextCustomError("No feed description found!", 404, next);
    }
    res.status(200).json({ content: feedDescription });
  } catch (err) {
    next(err);
  }
};

// PATCH FeedDescription ✅
export const patchFeedDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const newData = req.body;
    const currentFeedDescription = await FeedModel.findOne();
    const id = currentFeedDescription?._id;
    // console.log("newData: ", newData);

    if (!currentFeedDescription) {
      return nextCustomError("No feed description found!", 404, next);
    }

    let updatedFeedDescription = await FeedModel.findByIdAndUpdate(
      id,
      newData,
      {
        new: true,
      }
    );

    // MEDIA UPLOAD BEGIN //
    if (files) {
      if (currentFeedDescription.feed_title_img && files["feed_title_img"]) {
        await deleteFileFromCloudinary(
          currentFeedDescription.feed_title_img,
          next
        );
      }
      if (
        currentFeedDescription.feed_profile_img &&
        files["feed_profile_img"]
      ) {
        await deleteFileFromCloudinary(
          currentFeedDescription.feed_profile_img,
          next
        );
      }

      if (files["feed_title_img"]) {
        await addFile(
          files["feed_title_img"][0],
          FeedModel,
          id as unknown as Types.ObjectId,
          "feed_title_img",
          next
        );
      }
      if (files["feed_profile_img"]) {
        await addFile(
          files["feed_profile_img"][0],
          FeedModel,
          id as unknown as Types.ObjectId,
          "feed_profile_img",
          next
        );
      }
    }
    // MEDIA UPLOAD END //
    updatedFeedDescription = await FeedModel.findById(id);
    res.status(200).json({ content: updatedFeedDescription });
  } catch (err) {
    next(err);
  }
};

// GET Posts ✅
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await PostModel.find();
    if (!posts) {
      return nextCustomError("No posts found!", 404, next);
    }
    res.status(200).json({ content: posts });
  } catch (err) {
    next(err);
  }
};

// POST CreatePost ✅
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      authorId,
      authorName,
      authorAvatar,
      authorAction,
      vibe,
      articleTitle,
      articleContent,
      articleLink,
    } = req.body;
    // console.log("req.body: ", req.body);

    if (
      !vibe ||
      !articleContent ||
      !authorAvatar ||
      !authorAction ||
      !authorName ||
      !authorId
    ) {
      return res.status(400).json({ message: "Data not complete" });
    }

    const decodedAuthorAvatar = decodeHtmlEntities(authorAvatar);

    const newPost = {
      authorId,
      authorName,
      authorAvatar: decodedAuthorAvatar,
      authorAction,
      vibe,
      articleTitle,
      articleContent,
      articleLink,
    };
    const createdPost = await PostModel.create(newPost);
    const id = createdPost._id;

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      await addFile(
        req.file,
        PostModel,
        id as unknown as Types.ObjectId,
        "articleImageSrc",
        next
      );
    }
    // MEDIA UPLOAD END //

    res.status(201).json({ content: createdPost });
  } catch (err) {
    next(err);
  }
};

// DELETE Post ✅
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentPost = await PostModel.findByIdAndDelete(id);
    if (!currentPost) {
      return nextCustomError("No post found!", 404, next);
    }

    // MEDIA DELETE ONLY IF IMAGE EXISTS
    if (currentPost.articleImageSrc) {
      await deleteFileFromCloudinary(currentPost.articleImageSrc, next);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// PATCH EditPost ✅
export const editPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      authorId,
      authorName,
      authorAvatar,
      authorAction,
      vibe,
      articleTitle,
      articleContent,
      articleImageSrc,
      articleLink,
    } = req.body;
    // console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    console.log("articleImageSrc: ", articleImageSrc);
    const currentPost = await PostModel.findById(id);
    if (!currentPost) {
      return nextCustomError("No post found!", 404, next);
    }

    const decodedAuthorAvatar = decodeHtmlEntities(authorAvatar);

    const newPostContent = {
      authorId,
      authorName,
      authorAvatar: decodedAuthorAvatar,
      authorAction,
      vibe,
      articleTitle,
      articleContent,
      articleImageSrc,
      articleLink,
    };

    const updatedPost = await PostModel.findByIdAndUpdate(id, newPostContent, {
      new: true,
    });

    // MEDIA UPLOAD / HANDLING BEGIN //
    if (!articleImageSrc) {
      if (currentPost.articleImageSrc) {
        await deleteFileFromCloudinary(currentPost.articleImageSrc, next);
      }
    }
    if (req.file) {
      if (currentPost.articleImageSrc) {
        await deleteFileFromCloudinary(currentPost.articleImageSrc, next);
      }
      await addFile(
        req.file,
        PostModel,
        id as unknown as Types.ObjectId,
        "articleImageSrc",
        next
      );
    }
    // MEDIA UPLOAD / HANDLING END //

    console.log("updatedPost: ", updatedPost);
    res.status(200).json({ content: updatedPost });
  } catch (err) {
    next(err);
  }
};

// =========================
