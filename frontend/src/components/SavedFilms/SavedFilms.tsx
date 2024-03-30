import React, { useState, useEffect, useCallback } from "react";
import "./SavedFilms.css";
import { Menu } from "../Menu/Menu";
import { NoFilmsSavedNotice } from "./Notice/Notice";
const baseUrl = process.env.REACT_APP_API_URL;

interface Film {
  id: string;
  rank: string;
  title: string;
  fullTitle: string;
  year: string;
  image: string;
  crew: string;
  imDbRating: string;
  imDbRatingCount: string;
}

interface Saved {
  films: Film[];
}

interface SavedFilmsProps {
  navigate: Function;
}

export const SavedFilms: React.FC<SavedFilmsProps> = ({ navigate }) => {
  const [inSession, setInSession] = useState<boolean>(false);
  const [saved, setSaved] = useState<Saved>({ films: [] });
  const [isHomepage] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const fetchFilms = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/savedFilms/films`, {
        credentials: "include",
      });
      const responseData = await response.json();
      setSaved(responseData);
      setIsFetched(true);
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${baseUrl}/tokens/validate`, {
          credentials: "include",
        });
        const responseData = await response.json();
        if (!responseData.session) {
          navigate("/login");
        } else {
          setInSession(true);
          fetchFilms();
        }
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    };
    validateToken();
  }, [fetchFilms, navigate]);

  const deleteFilm = async (index: number) => {
    try {
      await fetch(`${baseUrl}/savedFilms/film`, {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filmIndex: index,
        }),
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const renderFilms = (): JSX.Element[] => {
    return saved.films.map((film: Film, index: number) => {
      return (
        <div key={film.id}>
          <div className="film">
            <div className="film-title">{film.fullTitle}</div>
            <p>ImDb rating: {film.imDbRating}/10</p>
            <img
              src={film.image}
              alt=""
              key={`image${index + 1}`}
              width="300"
              height="400"
            ></img>
            <button
              className="delete-button"
              type="submit"
              onClick={() => deleteFilm(index)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="content">
        <Menu
          navigate={navigate}
          inSession={inSession}
          setInSession={setInSession}
          isHomepage={isHomepage}
        />
        <div className="film-content">
          <div className="film-grid">{renderFilms()}</div>
        </div>
      </div>
      <NoFilmsSavedNotice
        isFetched={isFetched}
        savedFilmsCount={saved.films.length}
      />
    </>
  );
};

export default SavedFilms;
