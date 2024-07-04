// D E F I N E   C L O U D I N A R Y   I N S T A N C E
// export const addFile = async (
//   file: Express.Multer.File,
//   model: Model<Document>,
//   postId: Types.ObjectId
// ) => {
//   if (file) {
//     const allowedMimetypes = [
//       "png",
//       "jpg",
//       "jpeg",
//       "tiff",
//       "gif",
//       "bmp",
//       "mp4",
//       "mov",
//       "wmv",
//       "avi",
//       "mkv",
//       "flv",
//       "octet-stream",
//     ];
//     if (allowedMimetypes.some((el) => file.mimetype.includes(el))) {
//       cloudinary.config({
//         cloud_name: CLOUDINARY_CLOUD_NAME,
//         api_key: CLOUDINARY_API_KEY,
//         api_secret: CLOUDINARY_API_SECRET,
//       });
//       // console.log("req.file: ", req.file);
//       const absFilePath = __dirname + "../" + file.path;
//       const response = await cloudinary.uploader.upload(absFilePath, {
//         resource_type: "auto",
//         use_filename: true,
//       });
//       unlink(absFilePath);
//       await model.findByIdAndUpdate(postId, {
//         media: response.secure_url,
//         contentType: file.mimetype,
//       });
//     }
//   }
// };
