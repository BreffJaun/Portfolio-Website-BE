// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import multer from "multer";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const createUpload = (fieldName: string) => {
//   const upload = multer({ storage });
//   return upload.single(fieldName); // Hier wird der Fieldname dynamisch gesetzt
// };
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadPath = path.normalize("uploads/");

      // Erstelle Ordner rekursiv falls nicht vorhanden
      await fs.mkdir(uploadPath, { recursive: true });

      cb(null, uploadPath);
    } catch (error) {
      cb(error instanceof Error ? error : new Error("Upload failed"), "");
    }
  },
  filename: (req, file, cb) => {
    try {
      // Säubere Dateinamen und füge Unique-Suffix hinzu
      const originalName = file.originalname;
      const fileExtension = path.extname(originalName);
      const baseName = path.basename(originalName, fileExtension);

      // Ersetze Sonderzeichen und Leerzeichen
      const cleanBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

      const finalName = `${cleanBaseName}_${uniqueSuffix}${fileExtension}`;
      cb(null, finalName);
    } catch (error) {
      cb(error instanceof Error ? error : new Error("Filename error"), "");
    }
  },
});

// H E L P E R   F U N C T I O N
const createUpload = (fieldName: string) => {
  const upload = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB Limit
    },
  });
  return upload.single(fieldName);
};

export const uploadFeedImages = multer({ storage }).fields([
  { name: "feed_title_img", maxCount: 1 },
  { name: "feed_profile_img", maxCount: 1 },
]);

export const uploadMedia = createUpload("img");
export const uploadAvatar = createUpload("avatar");
export const uploadFeedTitleImg = createUpload("feed_title_img");
export const uploadFeedProfileImg = createUpload("feed_Profile_img");
export const uploadPostMedia = createUpload("articleImageSrc");
