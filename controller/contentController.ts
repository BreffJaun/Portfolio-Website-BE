// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
// import type { PatchUser } from "../types/interfaces";
import { Types } from "mongoose";

// I M P O R T:  F U N C T I O N S
import UserModel from "../models/userModel";
import LandingPageModel from "../models/landingPageModel";
import MySelfModel from "../models/mySelfModel";
import {
  StackDescriptionModel,
  StackTechnologiesModel,
} from "../models/stackModels";
import {
  ProjectsModel,
  ProjectDescriptionModel,
} from "../models/projectModels";
import {
  CertificatesModel,
  CertificatesDescriptionModel,
} from "../models/certificatesModels";

import type { UserDocument } from "../models/userModel";
import type { PatchUser } from "../types/interfaces";
import { sendMail } from "../services/nodeMailer/nodeMailerConfig";
// import { decodeToken } from "../middleware/auth";
import { nextCustomError } from "../middleware/errorhandler";
import {
  addFile,
  extractPublicIdFromUrl,
  deleteFileFromCloudinary,
} from "../services/media/cloudinary";
import { createVerifyToken } from "../services/jwt/jwt";
import { decodeToken } from "../middleware/auth";

// I M P O R T:  E N V  O P T I O N S
import {
  JWT_KEY,
  BE_HOST,
  FE_HOST,
  cookieAge,
  allowedMails,
} from "../config/config";
import { clear } from "console";
import e from "express";

//========================

// GET LandingPage ✅
export const getLandingPageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const landingPageContent = await LandingPageModel.findOne();
    if (!landingPageContent) {
      return nextCustomError("No landing page content found!", 404, next);
    }
    res.status(200).json({ content: landingPageContent });
  } catch (err) {
    next(err);
  }
};

// PATCH (Update)LandingPage ✅
export const patchLandingPageContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentLPContent = await LandingPageModel.findOne();
    const id = currentLPContent?._id;

    if (!currentLPContent) {
      return nextCustomError("No landing page content found!", 404, next);
    }

    const updatedLPContent = await LandingPageModel.findByIdAndUpdate(
      id,
      newData,
      {
        new: true,
      }
    );
    res.status(200).json({ content: updatedLPContent });
  } catch (err) {
    next(err);
  }
};

// GET MySelfContent ✅
export const getMySelfContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const content = await MySelfModel.findOne();
    if (!content) {
      return nextCustomError("Content not found!", 404, next);
    }
    res.status(200).json({ content: content });
  } catch (err) {
    next(err);
  }
};

// PATCH MySelfContent ✅
export const patchMySelfContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentMySelfContent = await MySelfModel.findOne();
    const id = currentMySelfContent?._id;

    if (!currentMySelfContent) {
      return nextCustomError("No content found!", 404, next);
    }

    const newMySelfContent = await MySelfModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({ content: newMySelfContent });
  } catch (err) {
    next(err);
  }
};

// GET StackContent ✅
export const getStackContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stackDescription = await StackDescriptionModel.findOne();
    const stackTechnologies = await StackTechnologiesModel.find();
    if (!stackDescription || !stackTechnologies) {
      return nextCustomError("Content not found!", 404, next);
    }

    const completeContent = {
      headline: stackDescription.headline,
      description: stackDescription.description,
      stack: stackTechnologies,
    };

    res.status(200).json({ content: completeContent });
  } catch (err) {
    next(err);
  }
};

// PATCH StackDescription ✅
export const patchStackDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentStackDescription = await StackDescriptionModel.findOne();
    const id = currentStackDescription?._id;

    if (!currentStackDescription) {
      return nextCustomError("No content found!", 404, next);
    }

    const updatedStackDescription =
      await StackDescriptionModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
    res.status(200).json({ content: updatedStackDescription });
  } catch (err) {
    next(err);
  }
};

// POST StackTechnologies ✅
export const postStackTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("Multer Output:", req.file);
    // console.log("Request Body:", req.body);
    if (!req.body.name || !req.file || !req.body.category) {
      return res.status(400).json({ message: "Missing data" });
    }

    const createdStackItem = await StackTechnologiesModel.create({
      name: req.body.name,
      img: "",
      category: req.body.category,
    });

    const id = createdStackItem._id;

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      await addFile(
        req.file,
        StackTechnologiesModel,
        id as Types.ObjectId,
        "img",
        next
      );
    }
    // MEDIA UPLOAD END //

    const finalStackItem = await StackTechnologiesModel.findById(id);

    res.status(201).json({ content: finalStackItem });
  } catch (err) {
    next(err);
  }
};

// PATCH StackTechnologies ✅
export const patchStackTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentStackItem = await StackTechnologiesModel.findById(id);

    // CHECK IF ITEM EXISTS
    if (!currentStackItem) {
      return nextCustomError("No Stack Item found!", 404, next);
    }

    const updateData: any = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.category !== undefined)
      updateData.category = req.body.category;

    let updatedStackItem = await StackTechnologiesModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      // console.log("req.file: ", req.file);
      if (currentStackItem.img) {
        await deleteFileFromCloudinary(currentStackItem.img, next);
      }
      await addFile(
        req.file,
        StackTechnologiesModel,
        currentStackItem._id as Types.ObjectId,
        "img",
        next
      );
    }
    // MEDIA UPLOAD END //

    updatedStackItem = await StackTechnologiesModel.findById(id);
    // console.log("updatedStackItem: ", updatedStackItem);
    res.status(201).json({ content: updatedStackItem });
  } catch (err) {
    next(err);
  }
};

// DELETE StackTechnologies ✅
export const deleteStackTechnologies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentStackItem = await StackTechnologiesModel.findByIdAndDelete(id);
    if (!currentStackItem) {
      return nextCustomError("No Stack Item found!", 404, next);
    }

    // MEDIA DELETE ONLY IF IMAGE EXISTS
    if (currentStackItem.img) {
      await deleteFileFromCloudinary(currentStackItem.img, next);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// GET CertificatesContent ✅
export const getCertificatesContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const description = await CertificatesDescriptionModel.findOne();
    const certificates = await CertificatesModel.find();

    if (!description) {
      return nextCustomError("Content not found", 404, next);
    }

    const completeContent = {
      headline: description.headline,
      description: description.description,
      certificates: certificates,
    };

    res.status(200).json({ content: completeContent });
  } catch (err) {
    next(err);
  }
};

// PATCH CertificatesDescription ✅
export const patchCertificatesDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const current = await CertificatesDescriptionModel.findOne();
    const id = current?._id;

    if (!current) {
      return nextCustomError("No content found!", 404, next);
    }

    const updatedCertificatesDescription =
      await CertificatesDescriptionModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
    res.status(200).json({ content: updatedCertificatesDescription });
  } catch (err) {
    next(err);
  }
};

// POST Certificates ✅
export const postCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("Multer Output:", req.file);
    // console.log("Request Body:", req.body);
    const { title, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({ message: "Missing data" });
    }

    const createdCertificateItem = await CertificatesModel.create({
      title: title,
      category: category,
      img: "",
    });

    const id = createdCertificateItem._id;

    // MEDIA UPLOAD BEGIN //
    await addFile(
      req.file,
      CertificatesModel,
      id as Types.ObjectId,
      "img",
      next
    );
    // MEDIA UPLOAD END //

    const finalCertificateItem = await CertificatesModel.findById(id);

    res.status(201).json({ content: finalCertificateItem });
  } catch (err) {
    next(err);
  }
};

// PATCH Certificates ✅
export const patchCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentCertificateItem = await CertificatesModel.findById(id);

    // CHECK IF CERTIFICATE EXISTS
    if (!currentCertificateItem) {
      return nextCustomError("No certificate found", 404, next);
    }

    const updateData: any = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.category !== undefined)
      updateData.category = req.body.category;

    let updatedCertificateItem = await CertificatesModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      // console.log("req.file: ", req.file);
      if (currentCertificateItem.img) {
        await deleteFileFromCloudinary(currentCertificateItem.img, next);
      }
      await addFile(
        req.file,
        CertificatesModel,
        currentCertificateItem._id as Types.ObjectId,
        "img",
        next
      );
    }
    // MEDIA UPLOAD END //

    updatedCertificateItem = await CertificatesModel.findById(id);
    // console.log("updatedCertificateItem: ", updatedCertificateItem);
    res.status(201).json({ content: updatedCertificateItem });
  } catch (err) {
    next(err);
  }
};

// DELETE Certificates ✅
export const deleteCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentCertificateItem = await CertificatesModel.findByIdAndDelete(
      id
    );
    if (!currentCertificateItem) {
      return nextCustomError("No Certificate found!", 404, next);
    }

    // MEDIA DELETE ONLY IF IMAGE EXISTS
    if (currentCertificateItem.img) {
      await deleteFileFromCloudinary(currentCertificateItem.img, next);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// GET Projects ✅
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectsDescription = await ProjectDescriptionModel.findOne();
    const projects = await ProjectsModel.find();
    if (!projectsDescription || !projects) {
      return nextCustomError("Projects not found!", 404, next);
    }

    const completeContent = {
      headline: projectsDescription.headline,
      description: projectsDescription.description,
      projects: projects,
    };

    res.status(200).json({ content: completeContent });
  } catch (err) {
    next(err);
  }
};

// PATCH ProjectDescription ✅
export const patchProjectDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newData = req.body;
    const currentProjectDescription = await ProjectDescriptionModel.findOne();
    const id = currentProjectDescription?._id;

    if (!currentProjectDescription) {
      return nextCustomError("No content found!", 404, next);
    }

    const updatedProjectDescription =
      await ProjectDescriptionModel.findByIdAndUpdate(id, newData, {
        new: true,
      });
    res.status(200).json({ content: updatedProjectDescription });
  } catch (err) {
    next(err);
  }
};

// POST Projects ✅
export const postProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.body.order ||
      !req.file ||
      !req.body.title ||
      !req.body.link ||
      !req.body.description ||
      !req.body.tags
    ) {
      return res.status(400).json({ message: "Data not complete" });
    }
    console.log("req.body: ", req.body);
    const newProject = {
      order: parseInt(req.body.order),
      img: req.file.path,
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      tags: req.body.tags.split(", "),
    };
    const createdProject = await ProjectsModel.create(newProject);
    const id = createdProject._id;

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      await addFile(req.file, ProjectsModel, id as Types.ObjectId, "img", next);
    }
    // MEDIA UPLOAD END //

    res.status(201).json({ content: createdProject });
  } catch (err) {
    next(err);
  }
};

// PATCH Projects ✅
export const patchProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const currentProject = await ProjectsModel.findById(id);
    // console.log("newData: ", newData);

    // CHECK IF ITEM EXISTS
    if (!currentProject) {
      return nextCustomError("No Project found!", 404, next);
    }

    // TAGS STRING TO ARRAY
    if (newData.tags && typeof newData.tags === "string") {
      newData.tags = newData.tags.split(", ").map((tag: string) => tag.trim());
    }

    let updatedProject = await ProjectsModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    // MEDIA UPLOAD BEGIN //
    if (req.file) {
      // console.log("req.file: ", req.file);
      if (currentProject.img) {
        await deleteFileFromCloudinary(currentProject.img, next);
      }
      await addFile(
        req.file,
        ProjectsModel,
        currentProject._id as Types.ObjectId,
        "img",
        next
      );
    }
    // MEDIA UPLOAD END //

    updatedProject = await ProjectsModel.findById(id);
    // console.log("updatedProject: ", updatedProject);
    res.status(201).json({ content: updatedProject });
  } catch (err) {
    next(err);
  }
};

// DELETE Projects ✅
export const deleteProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentProject = await ProjectsModel.findByIdAndDelete(id);
    if (!currentProject) {
      return nextCustomError("No Project found!", 404, next);
    }

    // MEDIA DELETE ONLY IF IMAGE EXISTS
    if (currentProject.img) {
      await deleteFileFromCloudinary(currentProject.img, next);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
