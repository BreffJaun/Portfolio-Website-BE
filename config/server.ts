// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import express from "express";

// ==============================================================
// C R E A T E  S E R V E R
export const app = express();

// S E R V E R   S T A R T
export const serverStart = (PORT: number | string) => {
  app.listen(PORT, () => {
    console.log("Server runs on Port: " + PORT, "🔄");
  });
};
