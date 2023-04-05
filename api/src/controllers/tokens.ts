import { Request, Response } from "express";
import { generateToken } from "../models/tokenGenerator";
import User, { IUser } from "../models/user";

export const TokensController = {
  Create: async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "auth error" });
    }

    if (user.password === password) {
      const token = await generateToken(user.id);
      return res
        .status(201)
        .cookie("token", token, { httpOnly: true })
        .json({ message: "OK" });
    } else {
      return res.status(401).json({ message: "auth error" });
    }
  },
};
