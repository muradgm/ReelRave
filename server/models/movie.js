import mongoose from "mongoose";
import genres from "../utils/genres.js";

const type = String;
const required = true;
const trim = true;

const movieSchema = mongoose.Schema(
  {
    title: {
      type,
      trim,
      required,
    },
    storyLine: {
      type,
      required,
      trim,
    },
    directors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "actor",
      },
    ],
    releaseDate: {
      type: Date,
      required,
    },
    status: {
      type,
      required,
      enum: ["public", "private"],
    },
    type: {
      type,
      required,
    },
    genres: {
      type: [String],
      required,
      enum: genres,
    },
    tags: {
      type: [String],
      required,
    },
    cast: [
      {
        actor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "actor",
        },
        roleAs: String,
        leadActor: Boolean,
      },
    ],
    writers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "actor",
      },
    ],
    poster: {
      type: Object,
      url: { type, required },
      public_id: { type, required },
      required,
      responsive: [URL],
    },
    trailer: {
      type: Object,
      url: { type, required },
      public_id: { type, required },
      required,
    },
    rating: {
      type,
    },
    duration: {
      type,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
    language: { type, required },
  },
  { timestamps: true }
);

const Movie = mongoose.model("movie", movieSchema);
export default Movie;
