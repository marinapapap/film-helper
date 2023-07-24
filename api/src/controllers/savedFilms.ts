import { Request, Response } from "express";
import { getUserIdFromToken, findUserById } from "../helperFunctions";

export const RandomFilmController = {
  RemoveFilm: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = getUserIdFromToken(token);

      const filmIndex: number = req.body.filmIndex;
      if (typeof filmIndex !== "number") {
        return res.status(400).json({ message: "Invalid film index" });
      }

      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (filmIndex >= 0 && filmIndex < user.films.length) {
        user.films.splice(filmIndex, 1);
        await user.save();

        return res
          .status(200)
          .json({ user, message: "Film deleted successfully" });
      } else {
        return res.status(404).json({ message: "Invalid film index" });
      }
    } catch (error) {
      console.error("Error saving film:", error);
      return res.status(500).json({ message: "Failed to save film" });
    }
  },
};
