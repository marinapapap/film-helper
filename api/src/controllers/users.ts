import { Request, Response } from "express";
import User, { IUser } from "../models/user";

const UsersController = {
  Create: async (req: Request, res: Response): Promise<void> => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    try {
      await user.save();
      res.status(201).json({ message: "OK" });
    } catch (err) {
      res.status(400).json({ message: "Bad request" });
    }
  },
};

export default UsersController;
