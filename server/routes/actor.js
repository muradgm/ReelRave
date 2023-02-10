import express from "express";
import {
  createActor,
  getLatestActors,
  getSingleActor,
  removeActor,
  searchActor,
  updateActor,
} from "../controllers/actor.js";
import { isAdmin, isAuth } from "../middleware/auth.js";
import { uploadImage } from "../middleware/multer.js";
import { actorInfoValidator, validate } from "../middleware/validator.js";
const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);

router.post(
  "/update/:actorId",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/:actorId", isAuth, isAdmin, removeActor);
router.get("/search", isAuth, isAdmin, searchActor);
router.get("/latest-uploads", isAuth, isAdmin, getLatestActors);
router.get("/single/:id", getSingleActor);

export default router;
