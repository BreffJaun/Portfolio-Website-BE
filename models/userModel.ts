// I M P O R T   D E P E N D E N C I E S
import { Document, Schema, model } from "mongoose";
import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { User } from "../types/interfaces.ts";

// S C H E M A  -  D A T A   S T R U C T U R E
export interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true, select: false },
    userName: { type: String, required: true },
    avatar: { type: String, required: false },
    isVerified: { type: Boolean, required: true },
  },
  { strictQuery: true }
);

// Hidden properties of Mongoose Objects in the Node.js JSON Responses (Responses)
// userSchema.methods.toJSON = function (this: UserDocument) {
//   const obj = this.toObject();
//   const userName = obj.userName;
//   delete obj.password;
//   return obj;
// };

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
const UserModel = model<UserDocument>("User", userSchema, "users");
export default UserModel;
