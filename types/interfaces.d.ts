// I M P O R T   D E P E N D E N C I E S
import { Document, Types } from "mongoose";
import { StackCategory } from "./types";

export interface User {
  email: string;
  password: string;
  userName: string;
  avatar: string;
  isVerified: boolean;
  isVerifiedTCP: boolean; // TCP => To Change Password
}

export interface PatchUser {
  userName?: string;
  email?: string;
  password?: string;
}

export interface FeedDescription extends Document {
  _id: Types.ObjectId;
  feed_title_img?: string;
  feed_profile_img?: string;
  ghLink: string;
  fullName: string;
  statement: string;
  jobTitle: string;
  about: string;
}

export interface Post extends Document {
  _id: Types.ObjectId;
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  authorAction?: string;
  // date: string;
  vibe: string;
  articleTitle?: string;
  articleContent: string;
  articleImageSrc?: string;
  articleLink?: string;
}

export interface LandingPage {
  introduction: string;
  name: string;
  connectingWords: string;
  jobTitle: string;
  description: string;
}

export interface MySelf {
  headline: string;
  motto: string;
  connectingWords: string;
  jobTitle: string;
  description: string;
}

export interface StackItem {
  name: string;
  img: string;
  category: StackCategory;
  scaledWidth?: number;
  scaledHeight?: number;
}

export interface StackContent {
  headline: string;
  description: string;
  stack: StackItem[];
}

export interface ProjectItem {
  order: number;
  img: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface ProjectContent {
  headline: string;
  description: string;
  stack: ProjectItem[];
}
