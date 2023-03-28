import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";

config({ path: "./config.env" });

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/setup", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Hello there, this is Express + TypeScript" });
});

export { app };
