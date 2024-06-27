// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// I M P O R T:  M O D E L
import UserModel from "../models/userModel.ts";

// I M P O R T:  C O M P O N E N T S
import { connectToDatabase } from "../config/database.ts";

// C O N N E C T   W I T H   M O N G O O S E  D B
connectToDatabase();

// C L E A N I N G   P R O C E S S
cleanDB();

async function cleanDB() {
  try {
    const userPromise = UserModel.deleteMany({}); // remove all entries
    const values = await Promise.all([userPromise]);
    console.log("DB cleaned.", values);
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

/* npm run clean
to empty the db */
