import express from "express";
import {
  createMovie,
  deleteMovie,
  updateMovieWithoutPoster,
  updateMovieWithPoster,
  uploadTrailer,
} from "../controllers/movie.js";
import { isAdmin, isAuth } from "../middleware/auth.js";
import { parseData } from "../middleware/helper.js";
import { uploadImage, uploadVideo } from "../middleware/multer.js";
import { validate, validateMovie } from "../middleware/validator.js";
const router = express.Router();

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  createMovie
);

router.patch(
  "/update-without-poster/:movieId",
  isAuth,
  isAdmin,
  // parseData,
  validateMovie,
  validate,
  updateMovieWithoutPoster
);

router.patch(
  "/update-with-poster/:movieId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateMovie,
  validate,
  updateMovieWithPoster
);

router.delete("/:movieId", isAuth, isAdmin, deleteMovie);

export default router;
