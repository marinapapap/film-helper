import React from "react";
import "../../App.css";

interface LogoutFormProps {
  navigate: Function;
  inSession: boolean;
}

export const LogoutForm: React.FC<LogoutFormProps> = ({
  navigate,
  inSession,
}) => {
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await fetch("/tokens/logout");
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
