// MVC - Modal View Controller
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./lib/db.js";
import userRouter from "./routes/user.js";
import actorRouter from "./routes/actor.js";
import movieRouter from "./routes/movie.js";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import expressAsyncErrors from "express-async-errors";
import { handleNotFound } from "./utils/helper.js";

dotenv.config();
connect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);

app.use("/*", handleNotFound);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
