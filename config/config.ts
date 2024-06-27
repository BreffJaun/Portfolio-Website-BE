// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import "dotenv/config";

// ==============================================================

// H O S T S
export const BE_HOST = process.env.BE_HOST;
export const FE_HOST = process.env.FE_HOST;

// D B  C O N N E C T I O N  S T R I N G
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
export const MONGO_DB_CONNECTION_STRING =
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` ||
  "mongodb://localhost:27017";

// S E R V E R - P O R T
export const PORT = process.env.PORT || 4000;

// B C R Y P T   K E Y
export const JWT_KEY = process.env.SECRET_JWT_KEY || "DefaultValue";
export const JWT_EXPIRATION = process.env.SECRET_JWT_EXPIRATION || "1h";

// N O D E M A I L E R   K E Y S
export const SENDER_MAIL = process.env.SENDER_MAIL;
export const GMAIL_APP_PASS = process.env.GMAIL_APP_PASS;

// C O R S  S E T T I N G S
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").filter((origin) => origin)
  : "*";
export const corsOptions = {
  origin: CORS_ORIGINS,
  credentials: true,
  // ...
};

// E R R O R  H A N D L E R  S E T T I N G S
export const ERROR_HANDLING_OPTIONS = {
  showStack: process.env.NODE_ENV === "development",
  // Further error handling options...
};

// C O O K I E   A G E   S E T T I N G S
export const cookieAge = {
  oneHour: 1000 * 60 * 60,
  oneDay: 1000 * 60 * 60 * 24,
  oneWeek: 1000 * 60 * 60 * 24 * 7,
  oneMonth: 1000 * 60 * 60 * 24 * 30,
  oneYear: 1000 * 60 * 60 * 24 * 365,
};
