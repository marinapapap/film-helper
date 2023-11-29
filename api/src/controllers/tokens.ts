import { Request, Response } from "express";
import { generateToken } from "../models/tokenGenerator";
import JWT from "jsonwebtoken";
import { User } from "../models/user";
import * as bcrypt from "bcrypt";

export const TokensController = {
  Create: async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "auth error" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = await generateToken(user.id);
      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ message: "OK" });
    } else {
      return res.status(401).json({ message: "auth error" });
    }
  },

  Clear: async (req: Request, res: Response) => {
    res.clearCookie("token", { secure: true, sameSite: "none" });
    res.send({ success: true });
  },

  Check: async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(201)
        .json({ message: "no user in session", session: false });
    }

    JWT.verify(
      token,
      process.env.JWT_SECRET as string,
      (error: any, payload: any) => {
        if (error) {
          console.log(error);
          return res.status(401).json({ message: "auth error" });
        } else {
          return res
            .status(201)
            .json({ message: "user in session", session: true });
        }
      }
    );
  },
};
