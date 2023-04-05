import { Request, Response } from "express";
import User, { IUser } from "../models/user";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    const user = new User({
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
};
