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
  const [renderFilm, setRenderFilm] = useState<Boolean>(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetch("/randomFilm")
      .then((response) => {
        return response.json() as Promise<Film>;
      })
      .then(async (data) => {
        setRandomFilm(data);
        setRenderFilm(true);
      });
  };

  const showRandomFilm = (): JSX.Element => {
    return (
      <>
        <p>{randomFilm.result.fullTitle}</p>
        <img src={randomFilm.result.image} alt=""></img>
        <p>{randomFilm.result.crew}</p>
        <p>{randomFilm.result.imDbRating}/10</p>
        <div></div>
      </>
    );
  };

  return (
    <div className="App">
      <div>{renderFilm === true ? showRandomFilm() : false}</div>
      <button onClick={handleSubmit}>Film Roulette</button>
    </div>
  );
};

export default RandomFilm;
