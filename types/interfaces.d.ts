// I M P O R T   D E P E N D E N C I E S
import { Document, Types } from "mongoose";

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
