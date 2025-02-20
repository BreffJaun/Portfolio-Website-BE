import { Document, Types } from "mongoose";

const userFromDb: Document<
  unknown,
  {},
  {
    userName: string;
    avatar: string;
    email: string;
    password: string;
    isVerified: boolean;
  }
> & {
  userName: string;
  avatar: string;
  email: string;
  password: string;
  isVerified: boolean;
  _id: Types.ObjectId;
};
