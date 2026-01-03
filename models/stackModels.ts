// I M P O R T   D E P E N D E N C I E S
import { Document, Schema, model } from "mongoose";
import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { StackContent, StackItem } from "../types/interfaces";

// S C H E M A  -  D A T A   S T R U C T U R E

const stackItemSchema = new Schema<StackItem>(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["web", "mobile-ios", "mobile-android", "ux", "tools"],
      default: "web",
    },
  },
  { strictQuery: true }
);

const stackContentSchema = new Schema<StackContent>(
  {
    headline: { type: String, required: true },
    description: { type: String, required: true },
    stack: [stackItemSchema],
  },
  { strictQuery: true }
);

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
export const StackDescriptionModel = model<StackContent>(
  "StackContent",
  stackContentSchema,
  "stackContent"
);

export const StackTechnologiesModel = model<StackItem>(
  "StackItem",
  stackItemSchema,
  "stackItem"
);
