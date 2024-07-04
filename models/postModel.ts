// I M P O R T   D E P E N D E N C I E S
import { Schema, model, Model } from "mongoose";
// import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { Post } from "../types/interfaces";

// S C H E M A  -  D A T A   S T R U C T U R E
// export interface PostDocument extends Post, Document {}

const postSchema = new Schema<Post>(
  {
    // _id: { type: Types.ObjectId, required: true },
    authorAction: { type: String, required: false },
    date: { type: String, required: true },
    mood: { type: String, required: true },
    articleTitle: { type: String, required: false },
    articleContent: { type: String, required: true },
    articleImageSrc: { type: String, required: false },
    articleLink: { type: String, required: false },
  },
  { strictQuery: true }
);

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
const PostModel = (Model<Post> = model<Post>("Post", postSchema, "posts"));
export default PostModel;
