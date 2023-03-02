import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { uploadMovie, uploadTrailer } from "../../api/movies.js";
import { useNotification } from "../../hooks/index.js";
import { AiOutlineCloudUpload } from "react-icons/ai";
import MovieForm from "./MovieForm.jsx";
import { fetchMovieRating } from "../../api/ratings.js";

const MovieUpload = ({ visible, onClose }) => {
  const [file, setFile] = useState(null);
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [trailerInfo, setTrailerInfo] = useState({});
  const { updateNotification } = useNotification();

  const [showTrailerSelector, setShowTrailerSelector] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );

    if (error) updateNotification("error", error);
    setVideoUploaded(true);
    setTrailerInfo({ url, public_id });
  };

  const handleChange = (file) => {
    if (!file) {
      updateNotification("error", "Please select a file to upload!");
      return;
    }
    if (file.size > 100000000) {
      updateNotification("error", "file size must not exceed 100 MB!");
      return;
    }

    setFile(file);
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    setShowTrailerSelector(false);
    setShowProgress(true);
    handleUploadTrailer(formData);
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return <span className="animate-pulse">Processing...</span>;
    }

    return `Upload progress ${uploadProgress}%`;
  };

  const handleClick = (e) => {
    if (e.target.id === "movie-form-container") onClose();
  };

  const handleOnSubmitComplete = () => {
    setVideoUploaded(false);
    setVideoSelected(false);
    setFile(null);
    setTrailerInfo({});
    setUploadProgress(0);
    setShowTrailerSelector(true);
    setShowProgress(false);
    onClose();
  };

  const handleSubmit = async (data) => {
    if (!trailerInfo.url || !trailerInfo.public_id) {
      updateNotification("error", "Trailer is missing!");
      return;
    }
    setBusy(true);

    data.append("trailer", JSON.stringify(trailerInfo));
    console.log("data :>> ", data);

    const res = await uploadMovie(data);
    setBusy(false);
    console.log(res);

    if (res.error) {
      updateNotification("error", res.error);
      return;
    }

    handleOnSubmitComplete();
    updateNotification("success", "Movie uploaded successfully!");
  };

  if (!visible) return null;

  return (
    <div
      id="movie-form-container"
      onClick={handleClick}
      className="movie-wrapper fixed inset-0 z-[160] dark:bg-primary bg-opacity-50 bg-accent dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-primary dark:bg-accent rounded-lg overflow-auto w-[45rem] h-[40rem] p-2 custom-scrollbar ">
        {showTrailerSelector && (
          <TrailerSelector
            visible={!videoSelected}
            onTypeError={handleTypeError}
            handleChange={handleChange}
            file={file}
          />
        )}
        {!showTrailerSelector && (
          <>
            {videoSelected && !videoUploaded && (
              <Progress
                visible={videoSelected && !videoUploaded}
                message={getUploadProgressValue()}
                width={uploadProgress}
              />
            )}
            {videoUploaded && (
              <MovieForm
                busy={busy}
                visible={videoUploaded}
                onSubmit={!busy ? handleSubmit : null}
                onClose={onClose}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieUpload;

const TrailerSelector = ({ visible, handleChange, onTypeError, file }) => {
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center h-full space-y-4">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="flex flex-col justify-center items-center space-y-10">
          <div
            className={`w-48 h-48 border border-gray-400 dark:border-secondary rounded-full flex flex-col items-center justify-center text-gray-300 dark:text-secondary cursor-pointer`}
          >
            <AiOutlineCloudUpload size={60} />
            <p className="text-xs">Click here to select</p>
            <p className="text-xs">or</p>
            <p className="text-xs">Drag & Drop your file!</p>
          </div>
          <div className="text-lg">
            <p
              className={`${
                file
                  ? "text-accent dark:text-primary"
                  : "text-gray-600 dark:text-gray-600"
              }`}
            >
              {file
                ? `File name: ${file.name}, size: ${Math.round(
                    file.size / 1000000
                  )} MB`
                : "no files to upload yet"}
            </p>
          </div>
          <button className="create-button flex items-center space-x-2 hover:text-white text-accent transition bg-tertiary  rounded-xl text-md font-regular px-8 py-1 drop-shadow hover:drop-shadow-none">
            <span>Submit</span>
          </button>
        </div>
      </FileUploader>
    </div>
  );
};

const Progress = ({ message, width, visible, videoUploaded }) => {
  if (!visible) return null;

  return (
    <div className=" p-3 bg-secondary dark:bg-accent drop-shadow rounded">
      <div className="relative rounded-full overflow-hidden h-1 bg-gray-400">
        <div
          className="h-full rounded-full absolute left-0 bg-tertiary"
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="mt-1 font-semibold text-xs text-tertiary">{message}</p>
    </div>
  );
};
