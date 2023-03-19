import multer from "multer";
const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("supported only image files");
  }
  cb(null, true);
};

const videoFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("supported only video files");
  }
  cb(null, true);
};

export const uploadImage = multer({ storage, imageFileFilter }); // to upload images
export const uploadVideo = multer({ storage, videoFileFilter }); // to upload videos
