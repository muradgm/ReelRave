import React from "react";

const PosterSelector = ({ name, selectedPoster, onChange, accept }) => {
  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        type="file"
        name={name}
        id={name}
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            src={selectedPoster}
            alt={name}
            className={`${posterClasses} object-cover`}
          />
        ) : (
          <PosterUI />
        )}
      </label>
    </div>
  );
};

export default PosterSelector;

const posterClasses =
  "flex justify-center items-center border border-dashed rounded aspect-video dark:border-light-subtle border-dark-subtle cursor-pointer";

const PosterUI = () => {
  return (
    <div className={`${posterClasses} object-cover`}>
      <span className="dark:text-light-subtle text-dark-subtle">
        Select Poster
      </span>
    </div>
  );
};

//<img id="currentPhoto" src="SomeImage.jpg" onerror="this.onerror=null; this.src='Default.jpg'" alt="" width="100" height="120">
