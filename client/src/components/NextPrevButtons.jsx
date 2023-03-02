import React from "react";

const NextPrevButtons = ({
  pageNumber,
  disablePrev,
  disableNext,
  onNextClick,
  onPreviousClick,
}) => {
  return (
    <div className="flex justify-end items-center text-tertiary text-md space-x-6 mt-5">
      <Button
        onClick={onPreviousClick}
        disabled={disablePrev}
        title="Previous"
      />
      <span>{pageNumber}</span>
      <Button onClick={onNextClick} disabled={disableNext} title="Next" />
    </div>
  );
};

export default NextPrevButtons;

const Button = ({ onClick, disabled, title }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-0 disabled:cursor-default cursor-pointer hover:underline transition hover:font-semibold"
    >
      {title}
    </button>
  );
};
