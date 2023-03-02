import React from "react";
import WritersModal from "./WritersModal";
import CastModal from "./CastModal";
import GenresModal from "./GenresModal";

const ModalsWrapper = ({
  showWritersModal,
  setShowWritersModal,
  writers,
  handleWriterRemove,
  showCastModal,
  setShowCastModal,
  cast,
  handleCastRemove,
  showGenresModal,
  setShowGenresModal,
  updateGenres,
  genres,
}) => {
  return (
    <>
      {showWritersModal && (
        <WritersModal
          visible={showWritersModal}
          onClose={() => setShowWritersModal(false)}
          profiles={writers}
          handleRemove={handleWriterRemove}
        />
      )}
      {showCastModal && (
        <CastModal
          visible={showCastModal}
          onClose={() => setShowCastModal(false)}
          cast={cast}
          handleRemove={handleCastRemove}
        />
      )}
      {showGenresModal && (
        <GenresModal
          visible={showGenresModal}
          onClose={() => setShowGenresModal(false)}
          onSubmit={updateGenres}
          currentlySelectedGenres={genres}
        />
      )}
    </>
  );
};

export default ModalsWrapper;
