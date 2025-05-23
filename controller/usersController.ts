// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Request, Response, NextFunction } from "express";

// I M P O R T:  T Y P E S
// import type { PatchUser } from "../types/interfaces";
import { Types } from "mongoose";

// I M P O R T:  F U N C T I O N S
import UserModel from "../models/userModel";
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

//========================

// GET List of all users
export const usersGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(await UserModel.find());
  } catch (err) {
    next(err);
  }
};

// POST (Add) a new User ✅
export const usersPostUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const kof = "registration"; // kof => "kind of function"
    const newUser = req.body;
    newUser.isVerified = false;
    // console.log("newUser: ", newUser);
    if (!allowedMails.includes(newUser.email)) {
      return nextCustomError("This email is not allowed!", 401, next);
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await UserModel.create({
      ...newUser,
      password: hashedPassword,
    });

    // AVATAR IMPLEMENT BEGIN //
    if (req.file) {
      // console.log("req.file: ", req.file);
      await addFile(
        req.file,
        UserModel,
        createdUser._id as Types.ObjectId,
        "avatar",
        next
      );
    }
    // AVATAR IMPLEMENT END //

    // VERIFY EMAIL IMPLEMENT BEGIN //
    // await sendMail(createdUser, kof);
    await sendMail(createdUser.toObject(), kof);
    // VERIFY EMAIL IMPLEMENT END //

    res.status(201).json({
      message: "User created successfully",
      // newUser: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

// GET Verify new User via Email ✅
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    let decodedToken = decodeToken(token, JWT_KEY);
    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "_id" in decodedToken
    ) {
      const id = (decodedToken as jwt.JwtPayload)._id;
      const user = await UserModel.findByIdAndUpdate(id, { isVerified: true });
      res.redirect(`${FE_HOST}login`);
    } else {
      nextCustomError("Invalid token format.", 400, next);
    }
    // res.redirect("http://localhost:2404/login");
    // if we have a frontend, we can redirect the successful verification to the login page
  } catch (err) {
    next(err);
  }
};

// POST Request email for forgotten password ✅
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const kof = "forgotPassword"; // kof => "kind of function"
    const { email } = req.body;
    const userFromDb = await UserModel.findOne({ email });
    if (!userFromDb) {
      return nextCustomError("There is no user with this email!", 401, next);
    }

    // RESET EMAIL IMPLEMENT BEGIN //
    await sendMail(userFromDb.toObject(), kof);
    // RESET EMAIL IMPLEMENT END //

    res.status(201).json({
      message: "Sie erhalten eine E-Mail, um Ihr neues Passwort festzulegen.",
    });
  } catch (err) {
    next(err);
  }
};

// GET Verify reset token for forgotten password ✅
export async function verifyResetToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.params;
    const decodedToken = jwt.verify(token, JWT_KEY);
    const id = (decodedToken as jwt.JwtPayload)._id;
    await UserModel.findByIdAndUpdate(
      id,
      { isVerifiedTCP: true },
      { new: true }
    );
    res
      .cookie("resetToken", token, {
        maxAge: cookieAge.oneDay,
        httpOnly: true,
        sameSite: "none", // nur in Verbindung mit https
        secure: true, // nur in Verbindung mit https
      })
      .redirect(`${FE_HOST}setnewpassword`);
  } catch (err) {
    next(err);
  }
}

// POST Change (forgotten) password after email request
export const setNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.resetToken;
    if (!token) return nextCustomError("Token not found.", 400, next);
    const decodedToken = jwt.verify(token, JWT_KEY);
    const { password } = req.body;
    const id = (decodedToken as jwt.JwtPayload)._id;
    const user = await UserModel.findById(id);
    if (user && password && user.isVerifiedTCP) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          password: hashedPassword,
          isVerifiedTCP: false,
        },
        { new: true }
      );

      res
        .status(201)
        .json({ message: "Set new Password was SUCCESSFUL!" })
        .clearCookie("resetToken");
    } else {
      nextCustomError(
        "Password change failed. Please ensure you have verified your email.",
        400,
        next
      );
    }
  } catch (err) {
    next(err);
  }
};

// PATCH (Update) specific User ✅
export const usersPatchSpecific = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userName, email, password, newPassword } = req.body;
    const updates: PatchUser = {};
    const userFromDb = await UserModel.findById(id).select("+password");

    // CHECK IF USER EXISTS
    if (!userFromDb) {
      return nextCustomError("User not found!", 404, next);
    }

    // CHECK IF USER IS AUTHORIZED
    if (id !== req.token._id) {
      return nextCustomError("Not Authorized!", 401, next);
    }

    // AKTUALIZE USER NAME
    if (userName) {
      updates.userName = userName;
    }

    if (email) {
      if (!allowedMails.includes(email)) {
        return nextCustomError("This email is not allowed!", 401, next);
      }
      const existingUserWithEmail = await UserModel.findOne({
        email,
        _id: { $ne: id },
      });

      if (existingUserWithEmail) {
        return nextCustomError(
          "There is already a user with this email!",
          409,
          next
        );
      }
      updates.email = email;
    }

    // PASSWORD CHECK AND CHANGE BEGIN //
    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, userFromDb.password);
      if (!isMatch) {
        return nextCustomError("Old password is incorrect!", 401, next);
      }

      if (password === newPassword) {
        return nextCustomError(
          "New password must be different from the old one!",
          422,
          next
        );
      }
      updates.password = await bcrypt.hash(newPassword, 10);
    }
    // PASSWORD CHECK AND CHANGE END //

    // AVATAR IMPLEMENT BEGIN //
    if (req.file) {
      if (userFromDb.avatar) {
        const deleteResult = await deleteFileFromCloudinary(
          userFromDb.avatar,
          next
        );
      } else {
        console.log("No old avatar found to delete.");
      }
      await addFile(
        req.file,
        UserModel,
        userFromDb._id as Types.ObjectId,
        "avatar",
        next
      );
    }
    // AVATAR IMPLEMENT END //

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return nextCustomError("User not found!", 404, next);
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// DELETE specific User
// export const usersDeleteSpecific = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (req.params.id !== req.token.userId) {
//       nextCustomError("Not Authorized to delete this user!", 401, next);
//     }

//     const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       nextCustomError("User not found!", 404, next);
//     }
//     res.status(200).json({ message: "User deleted successfully." });
//   } catch (err) {
//     next(err);
//   }
// };

// ======================================================

// POST Login a User ✅
export const usersPostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const userFromDb: UserDocument | null = await UserModel.findOne({
      email: userData.email,
    }).select("+password"); // select password from db
    if (!userFromDb) {
      return nextCustomError("There is no user with this email!", 401, next);
    }

    const checkPassword = await bcrypt.compare(
      userData.password,
      userFromDb.password
    );

    if (!checkPassword) {
      nextCustomError("Invalid password!", 401, next);
    }

    const token = createVerifyToken(userFromDb);

    // Passwort löschen
    const userWithoutPassword = userFromDb.toObject();
    delete userWithoutPassword.password;

    // INSERT COOKIE CODE BEGIN //
    res
      .status(201)
      .cookie("loginCookie", token, {
        maxAge: cookieAge.oneHour,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        auth: "loggedin",
        email: userFromDb.email,
        message: "Login SUCCESSFUL!",
        user: userWithoutPassword,
      });
    // INSERT COOKIE CODE END //
  } catch (err) {
    next(err);
  }
};

// GET Check if User is already loggedin (if token is still valid) ✅
export const usersChecklogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.loginCookie;
    try {
      const tokenDecoded = jwt.verify(token, JWT_KEY);
      const userId = (tokenDecoded as jwt.JwtPayload)._id;
      const user = await UserModel.findById(userId).select("-password");
      res.status(200).json({ message: "User is logged in.", user: user });
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        nextCustomError("Token has expired. Please log in again.", 401, next);
      } else if (err instanceof jwt.JsonWebTokenError) {
        nextCustomError("Invalid token. Please log in again.", 401, next);
      }
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// GET Logout a User ✅
export const usersGetLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("loginCookie", { sameSite: "none", secure: true });
    res.status(200).json({ message: "Logout SUCCESSFULLY!" });
  } catch (err) {
    next(err);
  }
};

// ======================================================
