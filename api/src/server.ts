import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import randomFilmRouter from "./routes/randomFilm";

config({ path: "./config.env" });

const app: Express = express();
app.use(cors());
app.use(express.json());

// test endpoint

app.get("/setup", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello, this should appear in the header" });
});

// routes

app.use("/randomFilm", randomFilmRouter);

export { app };
