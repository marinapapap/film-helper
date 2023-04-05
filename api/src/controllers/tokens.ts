import { Request, Response, NextFunction } from "express";
import { generateToken } from "../models/tokenGenerator";
import JWT from "jsonwebtoken";
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

  Check: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Access denied...No token provided...");
    }

    JWT.verify(
      token,
      process.env.JWT_SECRET as string,
      (error: any, payload: any) => {
        if (error) {
          console.log(error);
          res.status(401).json({ message: "auth error" });
        } else {
          req.body.user_id = payload.user_id;
          next();
        }
      }
    );
  },
};
