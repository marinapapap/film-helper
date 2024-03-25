import React from "react";

interface NoFilmsSavedNoticeProps {
  isFetched: boolean;
  savedFilmsCount: number;
}

export const NoFilmsSavedNotice: React.FC<NoFilmsSavedNoticeProps> = ({
  isFetched,
  savedFilmsCount,
}) => {
  if (isFetched && !savedFilmsCount) {
    return (
      <div className="saved-msg">
        <p>Save films to curate your personal watch list here.</p>
        <p>
          You only have 10 slots to fill before it's time to actually start
          watching them!
        </p>
      </div>
    );
  } else {
    return null;
  }
};
