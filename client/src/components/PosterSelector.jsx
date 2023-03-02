import React from "react";

const PosterSelector = ({
  name,
  accept,
  selectedPoster,
  className,
  onChange,
  label,
}) => {
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
            className={`${posterClasses} object-cover ${className}`}
          />
        ) : (
          <PosterUI className={className} label={label} />
        )}
      </label>
    </div>
  );
};

export default PosterSelector;

const posterClasses =
  "flex justify-center items-center border border-dashed rounded-lg aspect-video dark:border-light-subtle border-dark-subtle cursor-pointer";

const PosterUI = ({ className, label }) => {
  return (
    <div className={`${posterClasses} object-cover ${className}`}>
      <span className="dark:text-light-subtle text-dark-subtle">{label}</span>
    </div>
  );
};

//<img id="currentPhoto" src="SomeImage.jpg" onerror="this.onerror=null; this.src='Default.jpg'" alt="" width="100" height="120">
