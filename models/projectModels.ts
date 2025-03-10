// I M P O R T   D E P E N D E N C I E S
import { Document, Schema, model } from "mongoose";
import { Types } from "mongoose";

// I M P O R T:  T Y P E S
import type { ProjectContent, ProjectItem } from "../types/interfaces";

// S C H E M A  -  D A T A   S T R U C T U R E

const projectItemSchema = new Schema<ProjectItem>(
  {
    order: { type: Number, required: true },
    img: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { strictQuery: true }
);

const projectContentSchema = new Schema<ProjectContent>(
  {
    headline: { type: String, required: true },
    description: { type: String, required: true },
    stack: [projectItemSchema],
  },
  { strictQuery: true }
);

// M O D E L - T E M P L A T E   F O R   D B   E N T R I E S
export const ProjectDescriptionModel = model<ProjectContent>(
  "ProjectContent",
  projectContentSchema,
  "projectContent"
);

export const ProjectsModel = model<ProjectItem>(
  "ProjectItem",
  projectItemSchema,
  "projectItem"
);
