import { Request, Response } from "express";
import { User } from "../models/user";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    try {
      const user = new User({
        ...req.body,
      });

      await user.save();
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
};
