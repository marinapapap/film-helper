import React, { useEffect, useState } from "react";
import "../../App.css";

interface SetupData {
  message: string;
}

const RandomFilm = ({ navigate }: { navigate: Function }) => {
  const [phrase, setPhrase] = useState<string>("");
  const [randomFilm, setRandomFilm] = useState<any>("");

  useEffect(() => {
    fetch("/setup")
      .then((response) => {
        console.log(response);
        return response.json() as Promise<SetupData>;
      })
      .then(async (data) => {
        setPhrase(data.message);
      });
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRandomFilm(<div>You pushed me!</div>);
  };

  return (
    <div className="App">
      <header>{phrase}</header>
      <div>{randomFilm}</div>
      <button onClick={handleSubmit}>Film Roulette</button>
    </div>
  );
};

export default RandomFilm;
