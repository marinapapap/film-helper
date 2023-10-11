import { Request, Response } from "express";
import { User } from "../models/user";
import * as bcrypt from "bcrypt";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(req.body.password);
      console.log(hashedPassword);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });

      await user.save();
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
};
