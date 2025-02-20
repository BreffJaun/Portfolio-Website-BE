// I M P O R T   D E P E N D E N C I E S
import { Document, Types } from "mongoose";

export interface User {
  email: string;
  password: string;
  userName: string;
  avatar: string;
  isVerified: boolean;
}

export interface PatchUser {
  email?: string;
  password?: string;
}

export interface Post extends Document {
  _id: Types.ObjectId;
  avatar: string;
  authorAction: string;
  date: string;
  mood: string;
  articleTitle: string;
  articleContent: string;
  articleImageSrc: string;
  articleLink?: string;
}
