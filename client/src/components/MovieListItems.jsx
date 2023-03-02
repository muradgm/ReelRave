import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { EditButtons } from "./form/Labels";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const MovieListItem = ({
  editButtons,
  poster,
  title,
  genres,
  rating,
  year,
  duration,
  storyline,
  status,
  key,
  index,
  length,
}) => {
  const [show, setShow] = useState([]);

  const handleOnMouseEnter = (index) => {
    setShow((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };
  const handleOnMouseLeave = (index) => {
    setShow((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div className="flex flex-col relative" key={index}>
      <div
        className="flex cursor-pointer p-1 relative"
        onMouseEnter={() => handleOnMouseEnter(index)}
        onMouseLeave={() => handleOnMouseLeave(index)}
      >
        <div
          className={`${rating ? "max-w-[125px]" : "max-w-[75px]"}  relative`}
        >
          <img
            src={poster}
            alt={title}
            className="object-cover aspect-w-3 aspect-h-4"
          />
        </div>
        <div className="flex flex-col justify-between lg:py-2 ml-5">
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-accent dark:text-primary capitalize lg:text-4xl md:text-2xl text-lg  md:font-normal lg:font-normal font-semibold tracking-wide">
                {/* {title.includes(":") ? title.split(": ")[1] : title} */}
                {title}
              </span>
              <span className="md:hidden inline-block text-sm text-tertiary font-semibold tracking-wide ml-2">
                {status === "Public" ? (
                  <AiFillEye size={20} className="text-tertiary" />
                ) : (
                  <AiFillEyeInvisible size={20} className="text-tertiary" />
                )}
              </span>
              <span className="hidden md:inline-block text-sm text-tertiary font-semibold tracking-wide ml-2">
                {status}
              </span>
            </div>
            {rating ? (
              <span className="mt-1 text-gray-500 text-sm flex">
                <span className="flex items-center space-x-2">
                  <BsStarFill size={14} className="text-yellow-500" />
                  <span className="text-sm font-semibold text-accent dark:text-secondary">
                    {rating}
                    <span className="font-light">/10</span>
                  </span>
                </span>
                <span>
                  <span className="dot before:w-[3px] before:h-[3px] before:rounded-full before:bg-gray-500 before:inline-block align-top text-xs leading-3  px-2"></span>
                  {year}
                  <span className="dot after:w-[3px] after:h-[3px] after:rounded-full after:bg-gray-500 after:inline-block align-top text-xs leading-3  px-2"></span>
                </span>
                <span className="inline-block">{duration}</span>
              </span>
            ) : null}
          </div>
          {storyline ? (
            <p className="text-sm text-gray-500">
              {storyline.slice(0, 160)} ...
            </p>
          ) : null}
          <div className="space-x-2">
            {genres.map((g, idx) => {
              return (
                <span
                  key={g + idx}
                  className=" text-accent dark:text-primary text-sm border dark:border-gray-700 rounded-full px-2 tracking-[0.01786rem] inline-flex "
                >
                  {g}
                </span>
              );
            })}
          </div>
        </div>
        {show[index] && (
          <EditOverlay show={show} index={index}>
            {editButtons.map(({ onClick, icon, title }, index) => (
              <EditButtons
                onClick={onClick}
                title={title}
                key={index}
                index={index}
              >
                {icon}
              </EditButtons>
            ))}
          </EditOverlay>
        )}
      </div>
      {index !== length - 1 && (
        <hr className="h-px my-4 dark:bg-gray-300 border-0 bg-gray-700" />
      )}
    </div>
  );
};

export default MovieListItem;

export const EditOverlay = ({ children, show, index }) => {
  return (
    <div
      className={`absolute inset-0 bg-primary dark:bg-accent bg-opacity-50 dark:bg-opacity-50 backdrop-blur-[2px] rounded-md transform scale-0   ${
        show[index] && "scale-100"
      }`}
    >
      <div className="flex h-full space-x-6 text-accent items-center justify-center dark:text-primary">
        {children}
      </div>
    </div>
  );
};
