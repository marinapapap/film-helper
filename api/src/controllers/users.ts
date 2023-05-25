import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import JWT from "jsonwebtoken";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      await user.save();
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  SaveFilm: async (req: Request, res: Response) => {
    const token = req.cookies.token;
    let userId = null;

    JWT.verify(
      token,
      process.env.JWT_SECRET as string,
      (error: any, payload: any) => {
        if (error) {
          console.log(error);
          return res.status(401).json({ message: "auth error" });
        } else {
          userId = payload.user_id;
        }
      }
    );

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "auth error" });
    } else {
      console.log(user.films);
      user.films.push(req.body.film);
      console.log(user.films);
      return res.status(201).json({ user: user });
    }
  },
};
