import { Request, Response } from "express";

export const RandomFilmController = {
  Find: async (req: Request, res: Response) => {
    interface Top250Films {
      items: any[];
    }

    let top250Films: Top250Films = { items: [] };

    try {
      let response: any = await fetch(
        `https://imdb-api.com/en/API/Top250Movies/${process.env.TOP_250}`
      );

      top250Films = await response.json();
    } catch (error) {
      return res.status(500).json({ message: error });
    }

    const random: number = Math.floor(Math.random() * top250Films.items.length);

    return res.status(200).json({ result: top250Films.items[random] });
  },
};
