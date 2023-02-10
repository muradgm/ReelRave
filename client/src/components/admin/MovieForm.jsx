import React, { useState } from "react";
import { useNotification } from "../../hooks/index.js";
import TagsInput from "../TagsInput";
import { classes } from "../../utils/theme";
import LiveSearch from "../LiveSearch";
import Submit from "../form/Submit";
import WritersModal from "../modals/WritersModal.jsx";
import CastForm from "../form/CastForm.jsx";
import CastModal from "../modals/CastModal.jsx";
import PosterSelector from "../PosterSelector.jsx";
import GenresSelector from "../GenresSelector.jsx";
import GenresModal from "../modals/GenresModal.jsx";

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "7",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "8",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "9",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "10",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "11",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "12",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

export const renderItem = (result, index, focusedIndex, isKeyDown) => {
  return (
    <div key={result.id} className="flex group space-x-3">
      <span className="w-16 h-16 overflow-hidden">
        <img
          src={result.avatar}
          alt={result.name}
          className={` ${
            isKeyDown && index === focusedIndex
              ? "transition-all scale-125 transform ease-in-out duration-300"
              : ""
          } w-full h-full rounded-l group-hover:scale-125 transition-all transform ease-in-out duration-300`}
        />
      </span>
      <p className="dark:text-primary text-accent">{result.name}</p>
    </div>
  );
};

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: [],
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

const MovieForm = () => {
  const { updateNotification } = useNotification();
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [showGenresModal, setShowGenresModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
    // setMovieInfo({ ...defaultMovieInfo });
  };

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);

    setSelectedPosterForUI(url); // this will create a url from this poster
  };
  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({
        ...movieInfo,
        poster,
      });
    }

    setMovieInfo({
      ...movieInfo,
      [name]: value,
    });
  };
  const updateTags = (tags) => {
    setMovieInfo({
      ...movieInfo,
      tags,
    });
  };
  const updateDirector = (profile) => {
    setMovieInfo({
      ...movieInfo,
      director: profile,
    });
  };
  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This profile is already selected!"
        );
      }
    }

    setMovieInfo({
      ...movieInfo,
      writers: [...writers, profile],
    });
  };
  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    console.log("cast", cast);
    setMovieInfo({
      ...movieInfo,
      cast: [...cast, castInfo],
    });
  };
  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) setShowWritersModal(false);
    setMovieInfo({
      ...movieInfo,
      writers: [...newWriters],
    });
  };
  const updateGenres = (genres) => {
    // const { genres } = movieInfo;
    setMovieInfo({
      ...movieInfo,
      genres,
    });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    console.log("cast", cast);
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) setShowCastModal(false);
    setMovieInfo({
      ...movieInfo,
      cast: [...newCast],
    });
  };

  const {
    title,
    storyLine,
    director,
    writers,
    cast,
    tags,
    releaseDate,
    genres,
  } = movieInfo;

  return (
    <>
      <div className="flex space-x-3 p-2 overflow-auto">
        <div className="w-[70%] space-y-5">
          <div
            className="text-gray-300  
        dark:text-gray-500
        focus-within:text-accent focus-within:dark:text-primary space-y-1"
          >
            <Label htmlFor="title" text="Title" />
            <input
              value={title}
              onChange={handleChange}
              name="title"
              id="title"
              type="text"
              className={`border text-md ${classes}`}
              placeholder="Titanic..."
            />
          </div>
          <div className="text-gray-300  dark:text-gray-500 focus-within:text-accent focus-within:dark:text-primary space-y-1">
            <Label htmlFor="stroyLine" text="Story Line" />
            <textarea
              value={storyLine}
              onChange={handleChange}
              name="storyLine"
              id="storyLine"
              placeholder="Movie storyline..."
              className={`${classes} resize-none h-24 border`}
            ></textarea>
          </div>
          <div className="text-gray-300 dark:text-gray-500  focus-within:text-accent focus-within:dark:text-primary space-y-1">
            <Label htmlFor="tags" text="Tags"></Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>
          <div className="text-gray-300  dark:text-gray-500 focus-within:text-accent focus-within:dark:text-primary z-[110] relative space-y-1">
            <Label htmlFor="director" text="Director" />
            <LiveSearch
              name="director"
              value={director.name}
              placeholder="Search profile"
              results={results}
              renderItem={renderItem}
              onSelect={(result) => updateDirector(result)}
            />
          </div>
          <div className="text-gray-300  dark:text-gray-500 focus-within:text-accent focus-within:dark:text-primary z-[109] relative space-y-1">
            <LabelWithBadge
              htmlFor="writers"
              text="Writers"
              badge={writers.length}
              crew={writers}
              onClick={() => setShowWritersModal(true)}
            />
            <LiveSearch
              name="writers"
              placeholder="Search profile"
              results={results}
              renderItem={renderItem}
              onSelect={(result) => updateWriters(result)}
            />
          </div>
          <div className="text-gray-300  dark:text-gray-500 focus-within:text-accent focus-within:dark:text-primary relative space-y-1 z-[108]">
            <LabelWithBadge
              htmlFor="castAndCrew"
              text="Cast & Crew"
              crew={cast}
              onClick={() => setShowCastModal(true)}
            />
            <CastForm name="castAndCrew" onSubmit={updateCast} />
          </div>
          <div className="flex flex-col text-gray-300  dark:text-gray-500 focus-within:text-accent focus-within:dark:text-primary relative space-y-1 w-3/6">
            <Label htmlFor="releaseDate" text="Release Date" />
            <input
              type="date"
              name="releaseDate"
              className={`${classes} border p-1 w-auto h-10 text-sm text-dark-subtle`}
              onChange={handleChange}
            />
          </div>

          <Submit
            value="submit"
            styles="text-lg w-full"
            type="button"
            onClick={handleSubmit}
          />
        </div>
        <div className="w-[30%] flex flex-col space-y-5">
          <PosterSelector
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg, image/jpeg, image/png"
          />
          <div className="">
            <GenresSelector
              badge={genres.length}
              onClick={() => setShowGenresModal(true)}
            />
          </div>
        </div>
      </div>
      <WritersModal
        visible={showWritersModal}
        onClose={() => setShowWritersModal(false)}
        profiles={writers}
        handleRemove={handleWriterRemove}
      />
      <CastModal
        visible={showCastModal}
        onClose={() => setShowCastModal(false)}
        cast={cast}
        handleRemove={handleCastRemove}
      />
      <GenresModal
        visible={showGenresModal}
        onClose={() => setShowGenresModal(false)}
        onSubmit={updateGenres}
        currentlySelectedGenres={genres}
      />
    </>
  );
};

const Label = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-md font-semibold">
      {text}
    </label>
  );
};

const LabelWithBadge = ({ children, onClick, htmlFor, text, crew }) => {
  const renderAll = () => {
    if (crew.length === 0) return;
    onClick();
  };
  const viewWritersText = () => {
    return crew && crew.length
      ? crew.length === 1
        ? "View Profile"
        : `View All `
      : null;
  };
  const RenderBadge = () => {
    return (
      <div
        className={` ${crew
          .map((obj) =>
            obj.profile ? "md:right-[15.5rem] right-[4rem]" : "right-1"
          )
          .join(
            " "
          )} z-[145] flex flex-col items-end absolute top-[.65rem]  space-y-1`}
      >
        <button
          type="button"
          onClick={renderAll}
          className={`text-accent dark:text-primary hover:underline transition text-xs`}
        >
          {viewWritersText()}
        </button>
        <div className="flex -space-x-3">
          {crew.slice(0, 2).map((obj, idx) => (
            <img
              key={idx}
              src={obj.avatar || obj.profile.avatar}
              alt={obj.name || obj.profile.name}
              className="w-9 h-9 border-2 border-primary dark:border-accent rounded-full"
            />
          ))}
          {crew.length > 1 && (
            <button
              onClick={onClick}
              type="button"
              className="flex items-center justify-center w-9 h-9 text-sm font-medium text-accent dark:text-accent bg-gray-700 border-2 dark:border-accent rounded-full hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 border-gray-800 cursor-pointer"
            >
              {`${crew.length}+`}
            </button>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="relative w-full">
      <Label htmlFor={htmlFor} text={text}>
        {children}
      </Label>
      {RenderBadge()}
    </div>
  );
};

export default MovieForm;
