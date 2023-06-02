import { Request, Response } from "express";
import { User, IFilm } from "../models/user";
import { getUserIdFromToken, findUserById } from "../helperFunctions";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  SaveFilm: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = getUserIdFromToken(token);

      const { film }: { film: IFilm } = req.body;
      if (!film || !film.id || !film.title) {
        return res.status(400).json({ message: "Invalid film data" });
      }

      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const filmData: IFilm = { ...film };
      user.films.push(filmData);
      await user.save();

      return res.status(201).json({ user, message: "OK" });
    } catch (error) {
      console.error("Error saving film:", error);
      return res.status(500).json({ message: "Failed to save film" });
    }
  },
};
