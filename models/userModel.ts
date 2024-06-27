// I M P O R T   D E P E N D E N C I E S
import { Document, Schema, model } from "mongoose";

// I M P O R T:  T Y P E S
import type { User } from "../types/interfaces.ts";

// S C H E M A  -  D A T A   S T R U C T U R E
interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isVerifiedTCP: { type: Boolean, default: false }, // TCP = To Change Password;
    // user: {type: Schema.Types.ObjectId, ref: "User", required: true}
  },
  { strictQuery: true }
);

// Hidden properties of Mongoose Objects in the Node.js JSON Responses (Responses)
userSchema.methods.toJSON = function (this: UserDocument) {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
const UserModel = model<UserDocument>("User", userSchema, "users");
export default UserModel;
