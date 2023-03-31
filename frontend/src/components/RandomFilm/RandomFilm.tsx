import React, { useState } from "react";
import "../../App.css";

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

interface RandomFilmProps {
  navigate: Function;
}

const RandomFilm: React.FC<RandomFilmProps> = ({ navigate }) => {
  const [randomFilm, setRandomFilm] = useState<Film>({
    result: {
      id: "",
      rank: "",
      title: "",
      fullTitle: "",
      year: "",
      image: "",
      crew: "",
      imDbRating: "",
      imDbRatingCount: "",
    },
  });

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetch("/randomFilm")
      .then((response) => {
        return response.json() as Promise<Film>;
      })
      .then(async (data) => {
        setRandomFilm(data);
      });
  };

  return (
    <div className="App">
      <div>{randomFilm.result.title}</div>
      <img src={randomFilm.result.image} alt="" width="500" height="600"></img>
      <div></div>
      <button onClick={handleSubmit}>Film Roulette</button>
    </div>
  );
};

export default RandomFilm;
