import React, { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useTheme } from "../../hooks";

const Header = ({ onAddMovieClick, onAddActorClick }) => {
  const { toggleTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const hideOptions = (e) => {
    if (!e.target.closest(".create-button")) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOptions);

    return () => {
      document.removeEventListener("click", hideOptions);
    };
  }, []);

  const options = [
    {
      title: "Add Movie",
      onClick: onAddMovieClick,
    },
    {
      title: "Add Actor",
      onClick: onAddActorClick,
    },
  ];

  const handleCloseCreateBtn = () => {
    if (showOptions) {
      setTimeout(() => {
        setShowOptions(false);
      }, 4000);
    }
  };

  useEffect(() => {
    handleCloseCreateBtn();
  }, [showOptions]);

  const createValue = () => {
    return (
      <React.Fragment>
        Create
        <GoPlus />
      </React.Fragment>
    );
  };

  return (
    <div className="flex items-center justify-between relative">
      <div className="relative z-[150] flex items-center justify-between w-full">
        <div className=" flex items-center text-gray-400 focus-within:text-accent dark:focus-within:text-primary">
          <FaSearch className="w-4 h-4 absolute ml-3 pointer-events-none" />
          <input
            type="text"
            className="border border-dark-subtle dark:border-light-subtle focus:border-accent dark:focus:border-primary dark:text-primary text-accent transition bg-transparent rounded-md text-lg p-1 pl-10 outline-none"
            placeholder="Search Movies..."
            autoComplete="off"
            aria-label="Search Movies"
          />
        </div>
        <div className="flex items-center space-x-5 ml-5">
          <button
            onClick={toggleTheme}
            className="text-accent dark:text-primary"
          >
            <BsFillSunFill size={24} />
          </button>
          <button
            onClick={() => setShowOptions(true)}
            className="group relative create-button flex items-center justify-center space-x-2 hover:text-white text-accent transition font-semibold bg-tertiary rounded-md text-lg px-3 py-1 h-10 w-[110px] overflow-hidden"
          >
            <span>Create</span>
            <GoPlus />
            <div className="absolute top-0 -inset-full h-full w-1/2 z-[5] block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
          </button>
        </div>
      </div>
      <div
        className={`absolute z-[120] right-0 transition-all duration-300 ease-in ${
          showOptions ? "visible top-12" : "invisible -top-full"
        }`}
      >
        <CreateOptions visible={showOptions} options={options} />
      </div>
    </div>
  );
};

export default Header;

const CreateOptions = ({ options }) => {
  return (
    <div
      className={`flex flex-col space-y-3 p-[1.1rem] bg-secondary text dark:bg-accent drop-shadow rounded-xl`}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={onClick}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-400 dark:text-gray-600 dark:hover:text-primary hover:text-accent transition cursor-pointer "
    >
      {children}
    </button>
  );
};
