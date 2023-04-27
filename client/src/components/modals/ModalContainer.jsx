import React from "react";

const ModalContainer = ({ children, onClose, visible, maxContainer }) => {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose && onClose();
  };
  if (!visible) return null;
  const handleMaxContainer = () => {
    return !maxContainer
      ? "max-w-[45rem] max-h-[40rem]"
      : "w-[45rem] h-[40rem]";
  };

  return (
    <div
      id="modal-container"
      onClick={handleClick}
      className="fixed inset-0 z-[180] dark:bg-primary bg-opacity-50 bg-accent dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
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
