import React, { useState, useEffect } from "react";
import "../../App.css";
import { Logout } from "../Auth/Logout";

interface SavedFilmsProps {
  navigate: Function;
  setGlobalSession: Function;
}

export const SavedFilms: React.FC<SavedFilmsProps> = ({
  navigate,
  setGlobalSession,
}) => {
  const [savedFilms, setSavedFilms] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/tokens/validate");
        const responseData = await response.json();

        console.log(responseData);
        setSavedFilms(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default SavedFilms;
