import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";

config({ path: "./config.env" });

const app: Express = express();
app.use(cors());
app.use(express.json());

import randomFilmRouter from "./routes/randomFilm";
import userRouter from "./routes/users";

// routes

app.use("/randomFilm", randomFilmRouter);
app.use("/users", userRouter);

export { app };
