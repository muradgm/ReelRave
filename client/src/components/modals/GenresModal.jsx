import React from "react";
import ModalContainer from "./ModalContainer";
import genres from "../../utils/genres.js";
import { useState } from "react";
import Submit from "../form/Submit";
import { useNotification } from "../../hooks";
import { useEffect } from "react";

const GenresModal = ({
  visible,
  onClose,
  onSubmit,
  currentlySelectedGenres,
}) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { updateNotification } = useNotification();
  const handleGenresSelector = (gen) => {
    let newGenres = [];
    if (selectedGenres.includes(gen)) {
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    } else {
      newGenres = [...selectedGenres, gen];
    }
    setSelectedGenres(newGenres);
  };

  const handleClose = () => {
    setSelectedGenres(currentlySelectedGenres);
    onClose();
  };

  const handelSubmit = () => {
    if (selectedGenres.length === 0) {
      updateNotification("error", "Please select at least one genre");
      return;
    }
    onSubmit(selectedGenres);
    handleClose();
  };

  useEffect(() => {
    setSelectedGenres(currentlySelectedGenres);
  }, []);

  return (
    <ModalContainer visible={visible} onClose={handleClose} maxContainer={true}>
      <div className="flex flex-col justify-between h-full p-6">
        <div className="">
          <h1 className="dark:text-primary text-accent font-semibold text-2xl text-center mb-10">
            Select Genres
          </h1>
          {genres.map((gen, index) => {
            return (
              <Genre
                onClick={() => handleGenresSelector(gen)}
                selected={selectedGenres.includes(gen)}
                key={gen}
              >
                {gen}
              </Genre>
            );
          })}
        </div>
        <div className="self-end w-32">
          <Submit value="Select" type="button" onClick={handelSubmit} />
        </div>
      </div>
    </ModalContainer>
  );
};

export default GenresModal;

const Genre = ({ children, selected, onClick }) => {
  const genreSelectedStyle = () => {
    return selected
      ? `bg-tertiary border-gray-600 dark:border-gray-300`
      : `dark:border-light-subtle border-black-subtle`;
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${genreSelectedStyle()} border text-accent dark:text-primary px-3 py-1 rounded-lg mr-3 mb-3`}
      // key={gen}
    >
      {children}
    </button>
  );
};
