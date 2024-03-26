import React from "react";
import "../RandomFilm.css";

interface SaveButtonProps {
  handleSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  saved: boolean;
  renderFilm: boolean;
  inSession: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  saved,
  handleSave,
  renderFilm,
  inSession,
}) => {
  if (renderFilm && inSession) {
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
  } else {
    return null;
  }
};
