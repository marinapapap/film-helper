import React, { useState } from "react";
import "../../App.css";
import "./Menu.css";
const baseUrl = process.env.REACT_APP_API_URL;

interface MenuProps {
  navigate: Function;
  inSession: boolean;
  setInSession: Function;
  isHomepage: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  navigate,
  inSession,
  setInSession,
  isHomepage,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    try {
      await fetch(`${baseUrl}/tokens/logout`, {
        credentials: "include",
      });

      setInSession(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const redirectToHomepage = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    navigate("/");
  };

  const redirectToList = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    navigate("/savedFilms");
  };

  const switchPageLink = () => {
    if (isHomepage) {
      return <div onClick={redirectToList}>Watch List</div>;
    } else {
      return <div onClick={redirectToHomepage}>Find Film</div>;
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-container">
        <span
          className="material-symbols-outlined icon"
          onClick={toggleDropdown}
        >
          movie
        </span>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div
              onClick={inSession ? handleSubmit : redirectToLogin}
              data-cy={inSession ? "logout-button" : "login-button"}
            >
              {inSession ? "Logout" : "Login"}
            </div>
            {switchPageLink()}
          </div>
        )}
      </div>
    </div>
  );
};
