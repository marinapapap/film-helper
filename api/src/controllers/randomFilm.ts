import { Request, Response } from "express";

const RandomFilmController = {
  Find: async (req: Request, res: Response) => {
    let top250Films: any[] = [];

    try {
      let response: any = await fetch(
        `https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`
      );

      top250Films = await response.json();
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ results: top250Films });
  },
};

export default RandomFilmController;
