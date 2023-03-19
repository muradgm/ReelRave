import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export default function connect() {
  const connectionStr = process.env.MONGO_URI;

  const { connection } = mongoose;
  connection.on("connecting", () => console.log("[DB] connecting"));
  connection.on("connected", () => console.log("[DB] connected"));
  connection.on("disconnecting", () => console.log("[DB] disconnecting"));
  connection.on("disconnected", () => console.log("[DB] disconnected"));
  connection.on("reconnected", () => console.log("[DB] reconnected"));
  connection.on("error", (error) => console.log("[DB] error", error));

  mongoose.connect(connectionStr);
}
