// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import multer from "multer";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
export const uploadSingleMedia = upload.single("media");
