import { Request, Response } from "express";

const RandomFilmController = {
  Find: async (req: Request, res: Response) => {
    res.status(200).json({ message: "route setup" });
  },
};

export default RandomFilmController;
