import React from "react";
import { CgSpinner } from "react-icons/cg";

const Submit = ({ value, busy, styles, type, onClick, children }) => {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : null}
      className={`${
        styles ? styles : "w-full"
      } rounded-lg bg-tertiary hover:drop-shadow-none transition font-roboto font-semibold outline-none text-white cursor-pointer drop-shadow flex items-center justify-center h-10`}
    >
      {busy ? (
        <CgSpinner size={24} className="animate-spin" />
      ) : value?.length ? (
        value
      ) : (
        children
      )}
    </button>
  );
};

export default Submit;
