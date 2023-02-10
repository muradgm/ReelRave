import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalContainer = ({ children, onClose, visible, maxContainer }) => {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose();
  };
  if (!visible) return null;
  const handleMaxContainer = () => {
    return !maxContainer
      ? "max-w-[500px] max-h-[500px]"
      : "w-[45rem] h-[40rem]";
  };
  console.log(maxContainer);

  return (
    <div
      id="modal-container"
      onClick={handleClick}
      className="z-[180] writers-modal fixed inset-0 dark:bg-primary bg-opacity-50 bg-accent dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        className={`${handleMaxContainer()} dark:bg-accent rounded-lg overflow-auto  drop-shadow-md custom-scrollbar bg-primary p-4`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
