import { check, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";
import genres from "../utils/genres.js";
export const userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is Missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing!")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long!"),
];

export const signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is Missing!"),
];

export const validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Missing!")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long!"),
];

export const actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("Actor name is Missing!"),
  check("about")
    .trim()
    .not()
    .isEmpty()
    .withMessage("About is a required field!"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Gender is a required field!"),
  check("birthDate")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Birth date is required")
    .isISO8601()
    .withMessage("Birth date must be a valid date"),
  check("nationality")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Nationality is a required field!"),
];

const currentYear = new Date().getFullYear() + 3;

export const validateMovie = [
  check("title").trim().not().isEmpty().withMessage("Movie title is Missing!"),
  check("storyLine")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Story line is Missing!"),
  check("language").trim().not().isEmpty().withMessage("Language is Missing!"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Movie status must be either Public or Private!"),
  // check("releaseDate").isDate().withMessage("Release date is Missing!"),
  check("releaseDate")
    .notEmpty()
    .withMessage("Release Year is missing!")
    .isInt({ min: 1900, max: 2100 })
    .withMessage(`Release Year must be between 1900 and ${currentYear}`),
  check("type").trim().not().isEmpty().withMessage("Movie type is Missing!"),
  check("genres")
    .isArray()
    .withMessage("Genres must be an array of strings!")
    .custom((value) => {
      for (let g of value) {
        if (!genres.includes(g)) {
          throw Error("Invalid genres!");
        }

        return true;
      }
    }),
  check("tags")
    .isArray({ min: 1 })
    .withMessage("Tags must be an array of strings!")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string") throw Error("Invalid genres!");
      }

      return true;
    }),
  check("cast")
    .isArray()
    .withMessage("Cast must be an array of strings!")
    .custom((cast) => {
      for (let i = 0; i < cast.length; i++) {
        if (!isValidObjectId(cast[i].actor))
          throw Error(`Invalid actor id at index${i} inside cast`);
        if (!cast[i].roleAs?.trim())
          throw Error(`RoleAs is missing at index ${i} inside cast!`);
        if (typeof cast[i].leadActor !== "boolean")
          throw Error(`Invalid leadActor value at index ${i} inside cast!`);
      }
      return true;
    }),
  check("trailer")
    .isObject()
    .withMessage("trailer must be an object with url and public_id")
    .custom(({ url, public_id }) => {
      try {
        const result = new URL(url);
        if (!result.protocol.includes("http"))
          throw Error("The Trailer url is invalid!");

        const arr = url.split("/");
        const publicId = arr[arr.length - 1].split(".")[0];

        if (public_id !== publicId)
          throw Error("Trailer Public_id is not valid!");
      } catch (error) {
        throw Error("Trailer url is not valid!");
      }

      return true;
    }),
  check("poster").custom((_, { req }) => {
    if (!req.file) throw Error("Poster file is missing!");

    return true;
  }),
];

export const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }

  next();
};
