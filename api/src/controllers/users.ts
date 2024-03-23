import { Request, Response } from "express";
import { User } from "../models/user";
import * as bcrypt from "bcrypt";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    try {
      const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!regex.test(req.body.password)) {
        return res.status(400).json({
          message:
            "Password must be at least 6 characters long and include at least one uppercase letter and one digit",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const lowercaseEmail = req.body.email.toLowerCase();
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: lowercaseEmail,
      });
      await user.save();
      return res.status(201).json({ message: "OK" });
    } catch (error: any) {
      if (error.code == 11000) {
        return res
          .status(400)
          .json({ message: "That email address is already registered" });
      } else {
        const errors = error.errors;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            return res.status(400).json({ message: errors[key].message });
          }
        }
        return res.status(400).json({ message: error });
      }
    }
  },
};
