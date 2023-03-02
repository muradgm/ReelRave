import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

const WritersModal = ({ onClose, profiles = [], visible, handleRemove }) => {
  return (
    <ModalContainer visible={visible} onClose={onClose} maxContainer={false}>
      <div className="space-y-4">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div key={id} className="flex flex-col">
              <div className="flex items-center space-x-4 drop-shadow bg-secondary dark:bg-gray-100 rounded p-2 dark:border-gray-200 border-gray-700 border">
                <img
                  className="w-14 h-14 rounded object-cover aspect-square"
                  src={avatar}
                  alt={name}
                />
                <p className="w-full font-semibold dark:text-primary text-accent">
                  {name}
                </p>
                <button
                  onClick={() => handleRemove(id)}
                  type="button"
                  className="dark:text-gray-500 text-gray-500 hover:text-accent hover:dark:text-secondary transition p-2"
                >
                  <AiOutlineClose />
                </button>
              </div>
              {/* {index !== profiles.length - 1 && (
                <hr className="h-px my-4 dark:bg-gray-300 border-0 bg-gray-700" />
              )} */}
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default WritersModal;
