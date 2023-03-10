import React from "react";
import { ImTree } from "react-icons/im";

const GenresSelector = ({ onClick, badge }) => {
  const renderBadge = () => {
    if (!badge) return <span>Select Genres</span>;
    return (
      <div className="flex justify-between items-center h-full bg-accent rounded-lg">
        <span className="pl-3 h-full rounded-lg w-full flex items-center bg-primary dark:bg-accent">
          Selected Genres
        </span>
        <span className="text-primary bg-accent text-md font-semibold w-6 h-full rounded-r-lg justify-center items-center flex ">
          {badge <= 9 ? badge : "9+"}
        </span>
      </div>
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-dark-subtle dark:border-light-subtle dark:hover:border-primary hover:border-accent transition text-dark-subtle dark:text-light-subtle hover:dark:text-primary hover:text-accent h-10 w-full"
    >
      {/* <ImTree /> */}
      {/* <span className="icons8-mando" /> */}
      {/* <span>Select Genres</span> */}
      {renderBadge()}
    </button>
  );
};

export default GenresSelector;
