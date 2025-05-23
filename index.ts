// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import type { Request, Response, NextFunction } from "express";

// I M P O R T:  E N V  O P T I O N S
import { PORT, corsOptions } from "./config/config";

// I M P O R T:  C O M P O N E N T S
import { app, serverStart } from "./config/server";
import { connectToDatabase } from "./config/database";

// I M P O R T:  M I D D L E W A R E  H A N D L E R
import invalidRoute from "./routes/invalidRoute";
import errorHandler from "./middleware/errorhandler";

// I M P O R T:  R O U T E S
import usersRouter from "./routes/users";
import contentRouter from "./routes/content";
import feedRouter from "./routes/feed";

// ==============================================================

// M I D D L E W A R E

// SERVER MIDDLEWARE
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// ROUTER MIDDLEWARE

// Ignore-favicon-handler => delete it in case of existing frontend
app.get("/favicon.ico", (req: Request, res: Response, next: NextFunction) => {
  res.status(204).end();
});

// USERS
app.use("/api/users", usersRouter);

// CONTENT
app.use("/api/content", contentRouter);

// FEED
app.use("/api/feed", feedRouter);

// WRONG PATH HANDLER
app.use("/api/*", invalidRoute);

// ERROR HANDLER
app.use(errorHandler);

// ==============================================================

// C O N N E C T   W I T H   M O N G O O S E  D B
connectToDatabase();

// S E R V E R - S T A R T
serverStart(PORT);
