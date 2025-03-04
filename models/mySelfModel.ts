// I M P O R T   D E P E N D E N C I E S
import { Document, Schema, model } from "mongoose";
import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { MySelf } from "../types/interfaces";

// S C H E M A  -  D A T A   S T R U C T U R E

const mySelfSchema = new Schema<MySelf>(
  {
    headline: { type: String, required: true },
    motto: { type: String, required: true },
    connectingWords: { type: String, required: true },
    jobTitle: { type: String, required: true },
    description: {
      paragraph1: { type: String, required: true },
      paragraph2: { type: String, required: true },
      paragraph3: { type: String, required: true },
    },
  },
  { strictQuery: true }
);

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
const MySelfModel = model<MySelf>("MySelf", mySelfSchema, "mySelf");
export default MySelfModel;
