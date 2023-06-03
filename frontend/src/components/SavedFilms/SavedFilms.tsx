import React, { useState, useEffect } from "react";
import "../../App.css";
// import { Logout } from "../Auth/Logout";

// interface Saved {
//   films: any[];
// }

interface SavedFilmsProps {
  navigate: Function;
  setGlobalSession: Function;
}

export const SavedFilms: React.FC<SavedFilmsProps> = ({
  navigate,
  setGlobalSession,
}) => {
  const [inSession, setInSession] = useState<boolean>(false);
  const [saved, setSaved] = useState<any[]>([]);

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
        setSaved(responseData.films);
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    };

    validateToken();
    fetchFilms();
  }, []);

  const renderFilm = (): JSX.Element[] => {
    return saved.map((film: any) => {
      return <div key={film.id}>{film.title}</div>;
    });
  };

  return <>{renderFilm()}</>;
};

export default SavedFilms;
