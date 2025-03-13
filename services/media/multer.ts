// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import multer from "multer";

// ========================

// D E F I N E   M U L T E R   I N S T A N C E
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });
// export const uploadSingleMedia = upload.single("media");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const createUpload = (fieldName: string) => {
  const upload = multer({ storage });
  return upload.single(fieldName); // Hier wird der Fieldname dynamisch gesetzt
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
