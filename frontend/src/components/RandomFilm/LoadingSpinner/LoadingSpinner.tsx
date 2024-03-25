import React from "react";
import "./Spinner.css";
import Spinner from "react-bootstrap/Spinner";

interface LoadingSpinnerProps {
  isLoading: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spinner-content">
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

  return null;
};
