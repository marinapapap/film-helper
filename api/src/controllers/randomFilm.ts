import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { User } from "../models/user";

export const RandomFilmController = {
  Find: async (req: Request, res: Response) => {
    try {
      const top250Films = await fetchTop250Films();
      const randomFilm = getRandomFilm(top250Films.items);

      const token = req.cookies.token;
      if (!token) {
        return res.status(200).json({ result: randomFilm });
      }

      const userId = getUserIdFromToken(token);
      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const saved = searchForSavedFilm(user.films, randomFilm.id);

      return res.status(200).json({ result: randomFilm, saved });
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch random film" });
    }
  },
};

const fetchTop250Films = async () => {
  const response = await fetch(
    `https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`
  );
  return response.json();
};

const getRandomFilm = (films: any[]) => {
  const random = Math.floor(Math.random() * films.length);
  return films[random];
};

const getUserIdFromToken = (token: string) => {
  const payload = JWT.verify(token, process.env.JWT_SECRET as string) as {
    user_id: string;
  };
  return payload.user_id;
};

const findUserById = (userId: string) => {
  return User.findOne({ _id: userId });
};

const searchForSavedFilm = (films: any[], filmId: string) => {
  return films.some((film) => film.id === filmId);
};
