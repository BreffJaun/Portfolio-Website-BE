import { Document, Types } from "mongoose";

const userFromDb: Document<
  unknown,
  {},
  {
    userName: string;
    avatar: string;
    email: string;
    password: string;
  }
> & {
  userName: string;
  avatar: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
};
