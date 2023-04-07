import React, { useState, useEffect } from "react";
import "../../App.css";
import { LogoutForm } from "../Auth/Logout";

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
  setGlobalSession: Function;
}

export const RandomFilm: React.FC<RandomFilmProps> = ({
  navigate,
  setGlobalSession,
}) => {
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
  const [renderFilm, setRenderFilm] = useState<boolean>(false);
  const [inSession, setInSession] = useState<boolean>(false);

  useEffect(() => {
    fetch("/tokens/validate", {})
      .then((response) => response.json())
      .then(() => {
        setInSession(true);
        setGlobalSession(true);
      })
      .catch((error) => {
        setInSession(false);
      });
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/randomFilm");
      const data = (await response.json()) as Film;
      setRandomFilm(data);
      setRenderFilm(true);
    } catch (error) {
      console.error(error);
    }
  };

  const showRandomFilm = (): JSX.Element => {
    return (
      <>
        <p data-cy="fulltitle">{randomFilm.result.fullTitle}</p>
        <img
          src={randomFilm.result.image}
          alt=""
          data-cy="image"
          width="300"
          height="400"
        ></img>
        <p data-cy="crew">{randomFilm.result.crew}</p>
        <p data-cy="rating">{randomFilm.result.imDbRating}/10</p>
        <div></div>
      </>
    );
  };

  return (
    <div className="App">
      <div className="float:right;">
        <LogoutForm navigate={navigate} inSession={inSession} />
      </div>
      <div>{renderFilm === true ? showRandomFilm() : false}</div>
      <button type="submit" onClick={handleSubmit} data-cy="button">
        Film Roulette
      </button>
    </div>
  );
};
