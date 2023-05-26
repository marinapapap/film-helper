import { Request, Response } from "express";
import { User, Film, IFilm, IUser } from "../models/user";
import JWT from "jsonwebtoken";

export const UsersController = {
  Create: async (req: Request, res: Response) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      await user.save();
      return res.status(201).json({ message: "OK" });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  SaveFilm: async (req: Request, res: Response) => {
    try {
      // const token = req.cookies.token;
      // let userId = null;

      // JWT.verify(
      //   token,
      //   process.env.JWT_SECRET as string,
      //   (error: any, payload: any) => {
      //     if (error) {
      //       console.log(error);
      //       return res.status(401).json({ message: "auth error" });
      //     } else {
      //       userId = payload.user_id;
      //     }
      //   }
      // );

      // get user_id
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const payload = JWT.verify(token, process.env.JWT_SECRET as string) as {
        user_id: string;
      };
      const userId = payload.user_id;

      // const film = new Film({
      //   ...req.body.film,
      // });

      // const user = await User.findOne({ _id: userId });
      // if (!user) {
      //   return res
      //     .status(401)
      //     .json({ message: "Couldn't find user based on user ID" });
      // } else {
      //   user.films.push(film);
      //   try {
      //     await user.save();
      //     return res.status(201).json({ user: user });
      //   } catch (error) {
      //     return res.status(500).json({ message: "Failed to save film to user" });
      //   }
      // }

      // Validate the film data
      const { film }: { film: IFilm } = req.body;
      console.log(film);
      if (!film || !film.filmId || !film.filmTitle) {
        return res.status(400).json({ message: "Invalid film data" });
      }

      // Find the user and save the film
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const filmData: IFilm = {
        ...film,
      };
      user.films.push(filmData);
      await user.save();

      return res.status(201).json({ user });
    } catch (error) {
      // Handle the error
      console.error("Error saving film:", error);
      return res.status(500).json({ message: "Failed to save film" });
    }
  },
};
