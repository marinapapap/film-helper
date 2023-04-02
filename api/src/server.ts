import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import randomFilmRouter from "./routes/randomFilm";

config({ path: "./config.env" });

const app: Express = express();
app.use(cors());
app.use(express.json());

// routes

app.use("/randomFilm", randomFilmRouter);

export { app };
