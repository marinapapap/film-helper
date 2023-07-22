import React, { useState, useRef } from "react";
import "../../App.css";
import "./Menu.css";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    try {
      await fetch("/tokens/logout");

      setInSession(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
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
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-container">
        <span
          className="material-symbols-outlined icon"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          movie
        </span>
        {isDropdownOpen && (
          <div
            className="dropdown-content"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
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
