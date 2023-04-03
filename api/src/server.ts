import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import randomFilmRouter from "./routes/randomFilm";

config({ path: "./config.env" });

const app: Express = express();
app.use(cors());
app.use(express.json());

// mongoDB test

import User, { IUser } from "./models/user";

app.post("/user", async (req, res) => {
  const newUser: IUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json({ message: "OK", data: newUser });
});

app.get("/user", async (req, res) => {
  const users: IUser[] = await User.find({});
  res.status(200).json({ users: users });
});

// routes

app.use("/randomFilm", randomFilmRouter);

export { app };
