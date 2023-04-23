import React from "react";
import "../../App.css";

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
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await fetch("/tokens/logout");

      setInSession(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (inSession) {
    return (
      <div className="App">
        <button type="submit" onClick={handleSubmit} data-cy="logout-button">
          Logout
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
