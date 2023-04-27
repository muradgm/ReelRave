import Actor from "../models/actor.js";
import cloudinary from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";
import { formatActor, sendError, uploadImageToCloud } from "../utils/helper.js";

export const createActor = async (req, res) => {
  const { name, about, gender, birthDate, nationality, birthPlace } = req.body;
  const { file } = req;

  const oldActor = await Actor.findOne({ name });
  if (oldActor) {
    return sendError(res, "This actor is already in our database!");
  }

  const newActor = new Actor({
    name,
    about,
    gender,
    birthDate,
    nationality,
    birthPlace,
  });

  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    newActor.avatar = { url, public_id };
  } else {
    let placeholder = "";
    let id = "";
    if (newActor.gender === "male") {
      placeholder =
        "https://res.cloudinary.com/do72ihnym/image/upload/v1677150601/xs6ueqgpxbuuecuan6h8.jpg";
      id = "xs6ueqgpxbuuecuan6h8";
    } else {
      placeholder =
        "https://res.cloudinary.com/do72ihnym/image/upload/v1677150601/gpxbuuecuan6h8xs6ueq.jpg";
      id = "gpxbuuecuan6h8xs6ueq";
    }
    newActor.avatar = { url: placeholder, public_id: id };
  }

  await newActor.save();
  res.status(201).json({ actor: formatActor(newActor) });
};

export const updateActor = async (req, res) => {
  const { name, about, gender, birthDate, nationality, birthPlace } = req.body;
  const { file } = req;
  const { actorId } = req.params;

  if (!isValidObjectId(actorId)) return sendError(res, "Invalid request!");
  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "Invalid request, record not found!");

  const public_id = actor.avatar?.public_id;

  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return sendError(res, "Could not remove image from cloud!");
    }
  }

  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    actor.avatar = { url, public_id };
  }
  actor.name = name;
  actor.about = about;
  actor.gender = gender;
  actor.birthDate = birthDate;
  actor.nationality = nationality;
  actor.birthPlace = birthPlace;

  await actor.save();
  res.status(201).json(formatActor(actor));
};

export const patchActor = async (req, res) => {
  const { actorId } = req.params;
  const { name, about, gender, birthDate, birthPlace, nationality } = req.body;
  const { file } = req;

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "Invalid request, record not found!");

  actor.name = name || actor.name;
  actor.about = about || actor.about;
  actor.gender = gender || actor.gender;
  actor.birthDate = birthDate || actor.birthDate;
  actor.birthPlace = birthPlace || actor.birthPlace;
  actor.nationality = nationality || actor.nationality;

  const public_id = actor.avatar?.public_id;

  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return sendError(res, "Could not remove image from cloud!");
    }
  }

  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    actor.avatar = { url, public_id };
  }

  await actor.save();
  res.status(201).json(formatActor(actor));
};

export const removeActor = async (req, res) => {
  const { actorId } = req.params;

  if (!isValidObjectId(actorId))
    return sendError(res, "Invalid request, record not found!");

  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "Invalid request, record not found!");

  const public_id = actor.avatar?.public_id;

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return sendError(res, "Could not remove image from cloud!");
    }
  }

  await Actor.findByIdAndDelete(actorId);
  res.json({ message: "Record removed successfully!" });
};

export const searchActor = async (req, res) => {
  const { query } = req;
  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });

  const actors = result.map((actor) => formatActor(actor));
  res.json({ results: actors });
};

export const getLatestActors = async (req, res) => {
  const result = await Actor.find().sort({ createdAt: "-1" }).limit(12); //will sort the actors from latest created to oldest created
  const actors = result.map((actor) => formatActor(actor));
  res.json(actors);
};

export const getSingleActor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid request!");

  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Invalid request, actor not found!", 404);

  res.json(formatActor(actor));
};

export const getActors = async (req, res) => {
  const { page, limit } = req.query;
  console.log(page, limit);

  const actors = await Actor.find({})
    .sort({ createdAt: "-1" })
    .skip(parseInt(page) * parseInt(limit))
    .limit(parseInt(limit));
  // assign the total number of actors to the totalActors variable
  const totalActors = await Actor.countDocuments({});
  // total number of pages
  const totalPages = Math.ceil(totalActors / parseInt(limit));
  const profiles = actors.map((actor) => formatActor(actor));
  res.json({
    profiles,
    totalActors,
    totalPages,
  });
};
