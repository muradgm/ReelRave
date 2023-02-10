import crypto from "crypto";
import cloudinary from "./cloudinary.js";

export const sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

export const generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");

      resolve(buffString);
    });
  });
};

export const handleNotFound = (req, res) => {
  this.sendError(res, "Not Found!", 404);
};

export const uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file,
    {
      gravity: "face",
      height: 150,
      width: 150,
      crop: "thumb",
    }
  );

  return { url, public_id };
};

export const formatActor = (actor) => {
  const { name, gender, about, _id, avatar } = actor;
  return {
    id: _id,
    name,
    about,
    gender,
    avatar: avatar?.url,
  };
};
