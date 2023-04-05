import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";
import { config } from "dotenv";

config({ path: "./config.env" });

export const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

import randomFilmRouter from "./routes/randomFilm";
import userRouter from "./routes/users";

// routes

app.use("/randomFilm", randomFilmRouter);
app.use("/users", userRouter);

// export { app };
