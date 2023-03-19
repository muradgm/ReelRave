import { isValidObjectId } from "mongoose";
import cloudinary from "../utils/cloudinary.js";
import { sendError } from "../utils/helper.js";
import Movie from "../models/movie.js";

export const uploadTrailer = async (req, res) => {
  const { file } = req;
  console.log("file 81>>:", file);
  console.log("file.path :>> ", file.path);

  if (!file) return sendError(res, "Video file is missing!");
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      resource_type: "video",
    }
  );

  res.status(201).json({ url, public_id });
};

export const createMovie = async (req, res) => {
  const { file, body } = req;
  console.log("file :>> ", file);
  console.log("body :>> ", body);
  const {
    title,
    storyLine,
    directors,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    language,
    trailer,
    rating,
    duration,
  } = body;

  const newMovie = new Movie({
    title,
    storyLine,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    language,
    trailer,
    rating,
    duration,
  });

  console.log(typeof newMovie.directors);
  console.log("newMovie.directors", newMovie.directors);

  console.log("directors", directors);
  console.log("writers", writers);
  console.log("newMovie.writers", newMovie.writers);

  if (directors) {
    for (let directorId of directors) {
      if (!isValidObjectId(directorId))
        return sendError(res, "Invalid director id!");
    }
    newMovie.directors = directors;
  }
  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }
    newMovie.writers = writers;
  }

  // uploading poster
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(file.path, {
    transformation: {
      width: 720,
      height: 1280,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  console.log("url:", url);
  console.log("public_id:", public_id);
  console.log("responsive_breakpoints:", responsive_breakpoints);

  const poster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let imgObj of breakpoints) {
      const { secure_url } = imgObj;
      poster.responsive.push(secure_url);
    }
  }
  newMovie.poster = poster;

  await newMovie.save();
  console.log("newMovie :>> ", newMovie);

  res.status(201).json({ id: newMovie._id, title });
};

export const updateMovieWithoutPoster = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { body } = req;

    if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie Id!");

    const movie = await Movie.findById(movieId);
    if (!movie) return sendError(res, "Movie not found!", 404);

    const {
      title,
      storyLine,
      directors,
      releaseDate,
      status,
      type,
      genres,
      tags,
      cast,
      writers,
      language,
      trailer,
      rating,
      duration,
    } = body;

    movie.title = title;
    movie.storyLine = storyLine;
    movie.tags = tags;
    movie.releaseDate = releaseDate;
    movie.status = status;
    movie.type = type;
    movie.genres = genres;
    movie.cast = cast;
    movie.trailer = trailer;
    movie.language = language;
    movie.rating = rating;
    movie.duration = duration;

    if (directors) {
      for (let directorId of directors) {
        if (!isValidObjectId(directorId))
          return sendError(res, "Invalid director id!");
      }
      movie.directors = directors;
    }
    if (writers) {
      for (let writerId of writers) {
        if (!isValidObjectId(writerId))
          return sendError(res, "Invalid writer id!");
      }
      movie.writers = writers;
    }

    await movie.save();
    res.json({ message: "movie has been updated successfully!", movie });
  } catch (error) {
    sendError(res, "Error in updating movie", 500);
  }
};

export const updateMovieWithPoster = async (req, res) => {
  const { movieId } = req.params;
  const { body } = req;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie Id!");

  if (!req.file) return sendError(res, "Movie poster is missing!");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie not found!", 404);

  const {
    title,
    storyLine,
    directors,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    writers,
    language,
    trailer,
    rating,
    duration,
  } = body;

  movie.title = title;
  movie.storyLine = storyLine;
  movie.tags = tags;
  movie.releaseDate = releaseDate;
  movie.status = status;
  movie.type = type;
  movie.genres = genres;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;
  movie.rating = rating;
  movie.duration = duration;

  if (directors) {
    for (let directorId of directors) {
      if (!isValidObjectId(directorId))
        return sendError(res, "Invalid director id!");
    }
    movie.directors = directors;
  }
  if (writers) {
    for (let writerId of writers) {
      if (!isValidObjectId(writerId))
        return sendError(res, "Invalid writer id!");
    }
    movie.writers = writers;
  }

  // update poster
  //removing poster from cloud
  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if (result !== "ok") {
      return sendError(res, "Could not update poster at the moment!");
    }
  }

  // uploading poster
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(req.file.path, {
    transformation: {
      width: 720,
      height: 1280,
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  const newPoster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let imgObj of breakpoints) {
      const { secure_url } = imgObj;
      newPoster.responsive.push(secure_url);
    }
  }
  movie.poster = newPoster;

  await movie.save();
  res.json({ message: "movie has been updated successfully!", movie });
};

export const updateMoviePoster = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie Id!");

  if (!req.file) return sendError(res, "Movie poster is missing!");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie not found!", 404);

  // update poster
  //removing poster from cloud
  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if (result !== "ok") {
      return sendError(res, "Could not update poster at the moment!");
    }
  }

  // uploading poster
  const {
    secure_url: url,
    public_id,
    responsive_breakpoints,
  } = await cloudinary.uploader.upload(req.file.path, {
    transformation: {
      width: 720,
      height: 960,
      crop: "fill",
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3,
    },
  });
  const newPoster = { url, public_id, responsive: [] };
  const { breakpoints } = responsive_breakpoints[0];
  if (breakpoints.length) {
    for (let imgObj of breakpoints) {
      const { secure_url } = imgObj;
      newPoster.responsive.push(secure_url);
    }
  }
  movie.poster = newPoster;

  await movie.save();
  res.json({ message: "movie has been updated successfully!", movie });
};

export const deleteMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie id!");

  const movie = await Movie.findById(movieId);
  if (!movie) return sendError(res, "Movie not found!", 404);

  // if there's a poster? remove!
  const posterId = movie.poster?.public_id;
  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if (result !== "ok")
      return sendError(res, "Could not remove poster from cloud!");
  }

  //if there's trailer? remove!
  const trailerId = movie.trailer?.public_id;
  if (!trailerId) return sendError(res, "Could not find trailer in the cloud!");
  const { result } = await cloudinary.uploader.destroy(trailerId, {
    resource_type: "video",
  });
  if (result !== "ok")
    return sendError(res, "Could not remove trailer from cloud!");

  await Movie.findByIdAndDelete(movieId);
  res.json({ message: "Movie has been successfully removed!" });
};

export const getMovies = async (req, res) => {
  const { page = 0, limit = 10 } = req.params;
  const movies = await Movie.find({})
    .sort({ createdAt: -1 })
    .skip(parseInt(page) * parseInt(limit))
    .limit(parseInt(limit));

  const results = movies.map((movie) => ({
    id: movie._id,
    title: movie.title,
    poster: movie.poster?.url,
    genres: movie.genres,
    status: movie.status,
    storyLine: movie.storyLine,
    releaseDate: movie.releaseDate,
    cast: movie.cast,
    rating: movie.rating,
    duration: movie.duration,
  }));

  res.json({ movies: results });
};
