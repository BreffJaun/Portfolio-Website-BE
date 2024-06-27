import { Document, Types } from "mongoose";

const userFromDb: Document<
  unknown,
  {},
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
> & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
};
