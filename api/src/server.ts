import express, { Express } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

config({ path: "./config.env" });

export const app: Express = express();

app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cookieParser());
app.use(express.json());

import randomFilmRouter from "./routes/randomFilm";
import userRouter from "./routes/users";
import tokensRouter from "./routes/tokens";
import savedFilmsRouter from "./routes/savedFilms";

// routes

app.use("/randomFilm", randomFilmRouter);
app.use("/users", userRouter);
app.use("/tokens", tokensRouter);
app.use("/savedFilms", savedFilmsRouter);
