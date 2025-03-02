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
    isVerifiedTCP: boolean;
  }
> & {
  userName: string;
  avatar: string;
  email: string;
  password: string;
  isVerified: boolean;
  isVerifiedTCP: boolean;
  _id: Types.ObjectId;
};
