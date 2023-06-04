import React, { useState, useEffect } from "react";
import "../../App.css";
import { Logout } from "../Auth/Logout";

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

interface Saved {
  films: Film[];
}

interface SavedFilmsProps {
  navigate: Function;
  setGlobalSession: Function;
}

export const SavedFilms: React.FC<SavedFilmsProps> = ({
  navigate,
  setGlobalSession,
}) => {
  const [inSession, setInSession] = useState<boolean>(false);
  const [saved, setSaved] = useState<Saved>({ films: [] });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch("/tokens/validate");
        const responseData = await response.json();
        if (!responseData.session) {
          navigate("/");
        }
        setInSession(true);
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    };

    const fetchFilms = async () => {
      try {
        const response = await fetch("/users/films");
        const responseData = await response.json();
        setSaved(responseData);
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    };

    validateToken();
    fetchFilms();
  }, []);

  const renderFilms = (): JSX.Element[] => {
    return saved.films.map((film: any) => {
      return <div key={film.id}>{film.title}</div>;
    });
  };

  return (
    <>
      <Logout
        navigate={navigate}
        inSession={inSession}
        setInSession={setInSession}
      />
      <div>{renderFilms()}</div>
    </>
  );
};

export default SavedFilms;
