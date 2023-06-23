import React, { useState } from "react";
import "../../App.css";
import "./Auth.css";

interface LogoutProps {
  navigate: Function;
  inSession: boolean;
  setInSession: Function;
}

export const Logout: React.FC<LogoutProps> = ({
  navigate,
  inSession,
  setInSession,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
              // onMouseEnter={() => setDropdownOpen(true)}
              // onMouseLeave={() => setDropdownOpen(false)}
              data-cy={inSession ? "logout-button" : "login-button"}
            >
              {inSession ? "Logout" : "Login"}
            </div>
            <div>Save Films</div>
          </div>
        )}
      </div>
    </div>
  );
};
