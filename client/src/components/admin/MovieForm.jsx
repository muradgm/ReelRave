import React, { useState } from "react";
import { useNotification } from "../../hooks/index.js";
import { fetchPosterUrl } from "../../api/omdbApi.js";
import { fetchMovieDuration, fetchMovieRating } from "../../api/ratings.js";
import {
  CastSelector,
  DirectorSelector,
  GenresSelector,
  PosterSelector,
  Selector,
  TagsInput,
  WriterSelector,
} from "../index.js";

import {
  languageOptions,
  statusOptions,
  typeOptions,
  defaultMovieInfo,
  classes,
  inputWrapperClasses,
  validateMovieInfo,
} from "../../utils/index.js";

import Submit from "../form/Submit";
import { Label } from "../form/Labels.jsx";

import ModalsWrapper from "../modals/ModalsWrapper.jsx";

const MovieForm = ({ onSubmit, busy }) => {
  const { updateNotification } = useNotification();
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateMovieInfo(movieInfo);
    if (error) return updateNotification("warning", error);
    console.log(movieInfo);

    //stringifying cast, genres, writers, tags
    const { cast, genres, writers, tags, director, poster } = movieInfo;

    const formData = new FormData();
    const finalMovieInfo = {
      ...movieInfo,
    };
    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);

    const castIds = cast.map((c) => ({
      actor: c.profile.id,
      roleAs: c.roleAs,
      leadActor: c.leadActor,
    }));
    finalMovieInfo.cast = JSON.stringify(castIds);

    const writersIds = writers.map((w) => w.id);
    finalMovieInfo.writers = JSON.stringify(writersIds);

    if (director.id) finalMovieInfo.director = director.id;
    if (poster) finalMovieInfo.poster = poster;

    const movieTitle = movieInfo.title;
    const imdbRating = await fetchMovieRating(movieTitle);
    formData.append("rating", imdbRating);

    const movieDuration = await fetchMovieDuration(movieTitle);
    formData.append("duration", movieDuration);

    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }

    onSubmit(formData);
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
    if (name === "releaseDate") {
      const selectedDate = parseInt(value);
      return setMovieInfo({
        ...movieInfo,
        releaseDate: selectedDate,
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
    writers,
    cast,
    tags,
    genres,
    type,
    language,
    status,
    releaseDate,
  } = movieInfo;

  return (
    <>
      <div className="flex justify-between p-2 space-x-4 overflow-auto">
        <div className="w-[70%] space-y-5">
          <div className={`${inputWrapperClasses}`}>
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
          <div className={`${inputWrapperClasses}`}>
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
          <div className={`${inputWrapperClasses}`}>
            <Label htmlFor="tags" text="Tags"></Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>
          <DirectorSelector onSelect={updateDirector} />
          <WriterSelector
            onSelect={updateWriters}
            badge={writers.length}
            crew={writers}
            onClick={() => setShowWritersModal(true)}
          />
          <CastSelector
            onSelect={updateCast}
            crew={cast}
            onClick={() => setShowCastModal(true)}
            onSubmit={updateCast}
            movieInfo={movieInfo}
          />
          <div
            className={`${inputWrapperClasses} flex flex-col relative w-3/6`}
          >
            <Label htmlFor="releaseDate" text="Release Date" />
            <input
              type="number"
              name="releaseDate"
              className={`${classes} border p-2 w-auto h-10 text-sm text-dark-subtle`}
              onChange={handleChange}
              min="1900"
              max="2100"
              value={releaseDate}
            />
          </div>
          <Submit
            value="submit"
            styles="text-lg w-full"
            type="button"
            onClick={handleSubmit}
            busy={busy}
          />
        </div>
        <div className="w-[30%] flex flex-col space-y-5">
          <PosterSelector
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg, image/jpeg, image/png"
            label="Select Poster"
          />
          <div>
            <GenresSelector
              badge={genres.length}
              onClick={() => setShowGenresModal(true)}
            />
          </div>
          <div className="w-full space-y-3">
            <Selector
              onChange={handleChange}
              name="type"
              value={type}
              options={typeOptions}
              label="Type"
            />
            <Selector
              onChange={handleChange}
              name="language"
              value={language}
              options={languageOptions}
              label="Language"
            />
            <Selector
              onChange={handleChange}
              name="status"
              value={status}
              options={statusOptions}
              label="Status"
            />
          </div>
        </div>
      </div>
      <ModalsWrapper
        showWritersModal={showWritersModal}
        setShowWritersModal={setShowWritersModal}
        handleWriterRemove={handleWriterRemove}
        writers={writers}
        showCastModal={showCastModal}
        setShowCastModal={setShowCastModal}
        handleCastRemove={handleCastRemove}
        cast={cast}
        showGenresModal={showGenresModal}
        setShowGenresModal={setShowGenresModal}
        updateGenres={updateGenres}
        genres={genres}
      />
    </>
  );
};

export default MovieForm;
