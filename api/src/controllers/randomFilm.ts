import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { User, Film, IFilm, IUser } from "../models/user";

export const RandomFilmController = {
  Find: async (req: Request, res: Response) => {
    interface Top250Films {
      items: any[];
    }

    let top250Films: Top250Films = { items: [] };

    try {
      let response = await fetch(
        `https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`
      );

      top250Films = await response.json();
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch top 250 films" });
    }

    // get random film from top 250
    const random: number = Math.floor(Math.random() * top250Films.items.length);
    const filmToCheck = top250Films.items[random];

    // get user_id
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const payload = JWT.verify(token, process.env.JWT_SECRET as string) as {
      user_id: string;
    };
    const userId = payload.user_id;

    // Find the user and save the film
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // search for saved film
    let saved: boolean = false;
    user.films.forEach((film) => {
      film.id == filmToCheck.id ? (saved = true) : saved;
    });

    return res
      .status(200)
      .json({ result: top250Films.items[random], saved: saved });
  },
};
