import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { uploadTrailer } from "../../api/movies.js";
import { useNotification } from "../../hooks/index.js";
import { AiOutlineCloudUpload } from "react-icons/ai";
import MovieForm from "./MovieForm.jsx";
import WritersModal from "../modals/WritersModal.jsx";

const MovieUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [trailerInfo, setTrailerInfo] = useState({});

  const { updateNotification } = useNotification();

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
    if (!file)
      return updateNotification("error", "Please select a file to upload!");
    if (file.size > 100000000)
      return updateNotification("error", "file size must not exceed 100 MB!");
    setFile(file);
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
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

  return (
    <div className="  movie-wrapper fixed inset-0 dark:bg-primary bg-opacity-50 bg-accent dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-primary dark:bg-accent rounded-lg overflow-auto w-[45rem] h-[40rem] p-2 custom-scrollbar">
        {/* <Progress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
          file={file}
        /> */}
        <MovieForm />
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

const Progress = ({ message, width, visible, file }) => {
  if (!visible) return null;
  return (
    <div className="m-2 bg-secondary dark:bg-accent drop-shadow rounded p-3">
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
