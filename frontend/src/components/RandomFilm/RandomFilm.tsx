import React, { useState, useEffect } from "react";
import "./RandomFilm.css";
import { Menu } from "../Menu/Menu";
import { LoadingSpinner } from "./LoadingSpinner/LoadingSpinner";
import { ShowRandomFilm } from "./ShowRandomFilm/ShowRandomFilm";
import { SaveButton } from "./SaveButton/SaveButton";
import Modal from "react-modal";
const baseUrl = process.env.REACT_APP_API_URL;

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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#090909",
    borderRadius: "0.5em",
    background: "#e8e8e8",
    border: "1px solid #e8e8e8",
    transition: "all 0.3s",
    boxShadow: "6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff",
  },
};

export const RandomFilm: React.FC<RandomFilmProps> = ({ navigate }) => {
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
  const [saved, setSaved] = useState<boolean>(false);
  const [isHomepage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(baseUrl);
      try {
        const response = await fetch(`${baseUrl}/tokens/validate`, {
          credentials: "include",
        });
        const responseData = await response.json();

        if (responseData.session === true) {
          setInSession(true);
        }
      } catch (error) {
        setInSession(false);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/randomFilm`, {
        credentials: "include",
      });
      const data = (await response.json()) as any;
      setRandomFilm(data);
      setRenderFilm(true);

      setSaved(data.saved);
      console.log("HERE");
      console.log(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/savedFilms/films`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          film: {
            ...randomFilm.result,
          },
        }),
      });

      if (response.status === 403) {
        openModal();
      }

      const data = (await response.json()) as any;
      console.log(data.status);

      data.message === "OK" ? setSaved(true) : setSaved(false);
    } catch (error) {
      setSaved(false);
      console.error(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      <div>
        <Menu
          navigate={navigate}
          inSession={inSession}
          setInSession={setInSession}
          isHomepage={isHomepage}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          style={{
            color: "#090909",
            borderRadius: "0.5em",
            border: "1px solid #e8e8e8",
            transition: "all 0.3s",
          }}
        >
          x
        </button>

        <div className="limit-msg">You have reached the save limit</div>
      </Modal>

      <LoadingSpinner isLoading={isLoading} />

      <div className="film-roulette">
        <div>
          <ShowRandomFilm randomFilm={randomFilm} renderFilm={renderFilm} />
        </div>
        <div>
          <button
            className="button-rf"
            type="submit"
            onClick={handleSubmit}
            data-cy="button"
          >
            Film Roulette
          </button>

          <span style={{ margin: "20px" }}></span>
          <SaveButton
            handleSave={handleSave}
            saved={saved}
            renderFilm={renderFilm}
            inSession={inSession}
          />
        </div>
      </div>
    </div>
  );
};
