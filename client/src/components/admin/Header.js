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

  return (
    <div className="flex items-center justify-between relative">
      <div className="relative flex items-center justify-between w-full">
        {/* //z-10 */}
        <div className="relative flex items-center text-gray-400 focus-within:text-accent dark:focus-within:text-primary">
          <FaSearch className="w-4 h-4 absolute ml-3 pointer-events-none" />
          <input
            type="text"
            className="border-2 border-dark-subtle dark:border-light-subtle focus:border-accent dark:focus:border-primary dark:text-primary text-accent transition bg-transparent rounded-xl text-lg p-1 pl-10 outline-none"
            placeholder="Search Movies..."
            autoComplete="off"
            aria-label="Search Movies"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="text-accent dark:text-primary"
          >
            <BsFillSunFill size={24} />
          </button>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="create-button flex items-center space-x-2 hover:text-white text-accent transition font-semibold border-2 bg-tertiary border-tertiary rounded-xl text-lg px-3 py-1 drop-shadow hover:drop-shadow-none"
          >
            <span>Create</span>
            <GoPlus />
          </button>
        </div>
      </div>
      <div
        className={`absolute z-0 right-0 transition-all duration-300 ease-in ${
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
      className={`flex flex-col space-y-3 p-4 bg-secondary text dark:bg-accent drop-shadow rounded-xl`}
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

// import React, { useEffect, useState } from "react";
// import { useTheme } from "../../hooks/index.js";
// import { FaSearch } from "react-icons/fa";
// import { GoPlus } from "react-icons/go";
// import { BsFillSunriseFill } from "react-icons/bs";
// import { useRef } from "react";

// const Header = () => {
//   const [showOptions, setShowOptions] = useState(false);
//   const { toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center justify-between relative">
//       <div className="relative flex items-center text-gray-400 focus-within:text-primary">
//         <FaSearch className="w-4 h-4 absolute ml-3 pointer-events-none" />
//         <input
//           type="text"
//           className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-accent focus:border-primary dark:text-accent transition bg-transparent rounded-xl text-lg p-1 pl-10 outline-none"
//           placeholder="Search Movies..."
//           autoComplete="off"
//           aria-label="Search Movies"
//         />
//       </div>
//       <div class="flex items-center space-x-3">
//         <button
//           onClick={toggleTheme}
//           className="dark:text-accent text-dark-subtle"
//         >
//           <BsFillSunriseFill size={24} />
//         </button>
//         <button
//           onClick={() => setShowOptions(!showOptions)}
//           className="flex items-center space-x-2 hover:text-white text-accent transition font-semibold border-2 bg-tertiary border-tertiary rounded-xl text-lg px-3 py-1 drop-shadow hover:drop-shadow-none"
//         >
//           <span>Create</span>
//           <GoPlus />
//         </button>
//         <CreateOptions
//           visible={showOptions}
//           onClose={() => setShowOptions(false)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;

// const CreateOptions = ({ visible, onClose }) => {
//   const container = useRef();
//   const containerID = "option-container";

//   useEffect(() => {
//     const handleClose = (e) => {
//       if (!visible) return;
//       const { parentElement, id } = e.target;

//       if (parentElement.id === containerID || id === containerID) return;

//       container.current.classList.remove("animate-scale");
//       container.current.classList.add("animate-scale-reverse");
//     };

//     document.addEventListener("click", handleClose);

//     return () => {
//       document.removeEventListener("click", handleClose);
//     };
//   }, [visible]);

//   const handleAnimationEnd = (e) => {
//     if (e.target.classList.contains("animate-scale-reverse")) onClose();
//     e.target.classList.remove("animate-scale");
//   };

//   if (!visible) return null;

//   return (
//     <div
//       id={containerID}
//       ref={container}
//       className={`absolute right-0 flex flex-col space-y-3 p-4 dark:bg-secondary bg-accent drop-shadow rounded-xl animate-scale`}
//       onAnimationEnd={handleAnimationEnd}
//     >
//       <Option>Add Movie</Option>
//       <Option>Add Actor</Option>
//     </div>
//   );
// };

// const Option = ({ children, handleClick }) => {
//   return (
//     <button
//       onClick={handleClick}
//       className="dark:text-accent text-secondary hover:opacity-80 transition cursor-pointer "
//     >
//       {children}
//     </button>
//   );
// };
