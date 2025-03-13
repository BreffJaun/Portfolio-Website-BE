// I M P O R T   D E P E N D E N C I E S
import { Schema, model, Model } from "mongoose";
// import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { Post, FeedDescription } from "../types/interfaces";

// S C H E M A  -  D A T A   S T R U C T U R E

const feedDescriptionSchema = new Schema<FeedDescription>(
  {
    feed_title_img: { type: String, required: false },
    feed_profile_img: { type: String, required: false },
    ghLink: { type: String, required: true },
    fullName: { type: String, required: true },
    statement: { type: String, required: true },
    jobTitle: { type: String, required: true },
    about: { type: String, required: true },
  },
  {
    strictQuery: true,
    timestamps: true,
  }
);

const postSchema = new Schema<Post>(
  {
    authorId: { type: String, required: false },
    authorName: { type: String, required: false },
    authorAvatar: { type: String, required: false },
    authorAction: { type: String, required: false },
    // date: { type: String, required: true },
    vibe: { type: String, required: false, default: "" },
    articleTitle: { type: String, required: false },
    articleContent: { type: String, required: true },
    articleImageSrc: {
      type: String,
      required: false,
      match: [/^https?:\/\/[^\s]+$/, "Invalid URL format"],
    },
    articleLink: {
      type: String,
      required: false,
      default: "",
      match: [/^https?:\/\/[^\s]+$/, "Invalid URL format"],
    },
  },
  {
    strictQuery: true,
    timestamps: true,
  }
);

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
export const PostModel = model<Post>("Post", postSchema, "posts");

export const FeedModel = model<FeedDescription>(
  "FeedDescription",
  feedDescriptionSchema,
  "feedDescriptions"
);
