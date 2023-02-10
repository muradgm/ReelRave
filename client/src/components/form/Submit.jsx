import React from "react";
import { CgSpinner } from "react-icons/cg";

const Submit = ({ value, busy, styles, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick ? onClick : null}
      className={`${
        styles ? styles : "w-full"
      } rounded-lg bg-tertiary hover:bg-opacity-80 hover:drop-shadow-none transition font-roboto font-semibold outline-none text-white h-10 cursor-pointer drop-shadow flex items-center justify-center`}
    >
      {busy ? <CgSpinner size={24} className="animate-spin" /> : value}
    </button>
  );
};

export default Submit;
