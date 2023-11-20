import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

config({ path: "./config.env" });

export const app: Express = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cookieParser());
app.use(express.json());

app.set("trust proxy", true);

import randomFilmRouter from "./routes/randomFilm";
import userRouter from "./routes/users";
import tokensRouter from "./routes/tokens";
import savedFilmsRouter from "./routes/savedFilms";

// routes

// app.use("/randomFilm", apiLimiter, randomFilmRouter);
app.use("/", (req: Request, res: Response) => {
  console.log("Logging message to browser");
  res.send("Log message sent to browser!");
});
app.use("/randomFilm", randomFilmRouter);
app.use("/users", userRouter);
app.use("/tokens", tokensRouter);
app.use("/savedFilms", savedFilmsRouter);
