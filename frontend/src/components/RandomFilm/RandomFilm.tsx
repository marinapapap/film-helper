import React, { useState, useEffect } from "react";
import "./RandomFilm.css";
import { Menu } from "../Menu/Menu";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import Modal from "react-modal";

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
      try {
        const response = await fetch("/tokens/validate");
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
      const response = await fetch(`${process.env.API_URL}/randomFilm`);
      const data = (await response.json()) as any;
      setRandomFilm(data);
      setRenderFilm(true);

      setSaved(data.saved);
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
      const response = await fetch("/savedFilms/films", {
        method: "post",
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showRandomFilm = (): JSX.Element => {
    return (
      <>
        <h1 className="example" data-cy="fulltitle">
          {randomFilm.result.title}
        </h1>
        <p data-cy="crew">{randomFilm.result.crew}</p>
        <div>
          <img
            src={randomFilm.result.image}
            alt=""
            data-cy="image"
            width="300"
            height="400"
          ></img>
        </div>
        <div></div>
      </>
    );
  };

  const renderSaveButton = () => {
    return (
      <>
        {saved === false ? (
          <button
            className="button-rf"
            type="submit"
            onClick={handleSave}
            data-cy="button"
          >
            Save For Later
          </button>
        ) : (
          <button
            className="button-rf saved"
            type="button"
            data-cy="button-disabled"
            disabled
          >
            Saved
          </button>
        )}
      </>
    );
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
        <div>{renderFilm === true ? showRandomFilm() : false}</div>
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
          {renderFilm && inSession ? renderSaveButton() : false}
        </div>
      </div>
    </div>
  );
};
