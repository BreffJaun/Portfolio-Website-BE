// I M P O R T   D E P E N D E N C I E S
import { Document, Schema, model } from "mongoose";
import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { CertificatesContent, CertificateItem } from "../types/interfaces";

// S C H E M A  -  D A T A   S T R U C T U R E

const certificateItemSchema = new Schema<CertificateItem>(
  {
    order: { type: Number, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: ["web-development", "app-development", "soft-skills", "events"],
      default: "web-development",
    },
  },
  { strictQuery: true }
);

const certificatesContentSchema = new Schema<CertificatesContent>(
  {
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    certificates: [certificateItemSchema],
  },
  { strictQuery: true }
);

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
export const CertificatesDescriptionModel = model<CertificatesContent>(
  "CertificatesContent",
  certificatesContentSchema,
  "certificatesContent"
);

export const CertificatesModel = model<CertificateItem>(
  "CertificateItem",
  certificateItemSchema,
  "certificateItem"
);
