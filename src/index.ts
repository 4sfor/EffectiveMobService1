import express, { Express } from "express";
import dotenv from "dotenv";
import "./emitter/event";
dotenv.config();
import { errorHandler } from "./middleware/errorHandler.middleware";
import apiRouter from "./apiRouter";
import { filterMiddleware } from "./middleware/filter.middleware";
import connectionDb from "./connectionDb";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(filterMiddleware);
app.use(errorHandler);
app.use(express.json());
app.use("/api", apiRouter);

const start = async () => {
  try {
    await connectionDb.sync();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
