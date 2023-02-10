import mongoose from "mongoose";

const type = String;
const trim = true;
const required = true;
const actorSchema = mongoose.Schema(
  {
    name: {
      type,
      trim,
      required,
    },
    about: {
      type,
      trim,
      required,
    },
    gender: {
      type,
      trim,
      required,
    },
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
    role: {
      type,
      enum: [
        "actor",
        "director",
        "writer",
        "producer",
        "cinematographer",
        "voice actor",
        "composer",
      ],
      required,
      default: "actor",
    },
  },
  { timestamps: true }
);

actorSchema.index({ name: "text" });

const Actor = mongoose.model("actor", actorSchema);
export default Actor;
