import React from "react";
import "../RandomFilm.css";

interface Film {
  result: {
    id: string;
    rank: string;
    title: string;
    fullTitle: string;
    year: string;
    image: string;
    crew: string;
    imDbRating: string;
    imDbRatingCount: string;
  };
}

interface ShowRandomFilmProps {
  randomFilm?: Film;
}

export const ShowRandomFilm: React.FC<ShowRandomFilmProps> = ({
  randomFilm,
}) => {
  if (randomFilm) {
    return (
      <>
        <h1 className="example" data-cy="fulltitle">
          {randomFilm?.result.title}
        </h1>
        <p data-cy="crew">{randomFilm?.result.crew}</p>
        <div>
          <img
            src={randomFilm?.result.image}
            alt=""
            data-cy="image"
            width="300"
            height="400"
          ></img>
        </div>
        <div></div>
      </>
    );
  } else {
    return null;
  }
};
