import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const CastModal = ({ onClose, cast = [], visible, handleRemove }) => {
  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      // innerContainer="max-w-[45rem] max-h-[40rem]"
      maxContainer={false}
    >
      <div className="flex flex-col space-y-4">
        {cast.map(({ profile, roleAs, leadActor }, index) => {
          const { id, name, avatar } = profile;

          return (
            <div key={id} className="flex flex-col">
              <div className="flex items-center space-x-4 drop-shadow bg-secondary dark:bg-gray-100 rounded p-2 dark:border-gray-200 border-gray-700 border">
                <img
                  className="w-14 h-14 rounded object-cover aspect-square"
                  src={avatar}
                  alt={name}
                />
                <span class="flex flex-col flex-grow">
                  <p className="w-full font-semibold dark:text-primary text-accent">
                    {name}
                  </p>
                  <p className="w-full font-semibold dark:text-light-subtle text-dark-subtle capitalize">
                    {roleAs}
                  </p>
                  <p className="w-full font-semibold dark:text-primary text-accent">
                    {leadActor && <AiOutlineCheck className="text-tertiary" />}
                  </p>
                </span>

                <button
                  onClick={() => handleRemove(id)}
                  type="button"
                  className="dark:text-gray-500 text-gray-500 hover:text-accent hover:dark:text-secondary transition p-2"
                >
                  <AiOutlineClose />
                </button>
              </div>
              {/* {index !== cast.length - 1 && (
                <hr className="h-px my-4 dark:bg-gray-300 border-0 bg-gray-700" />
              )} */}
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

export default CastModal;
