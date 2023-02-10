import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const Input = ({ name, placeholder, label, ...rest }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <div className="flex flex-col-reverse">
        <input
          type="text"
          id={name}
          name={name}
          className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-accent focus:border-primary w-full text-lg outline-none px-2 dark:text-accent text-primary peer transition"
          placeholder={placeholder}
          {...rest}
        />
        <label
          htmlFor={name}
          className="font-semibold  dark:text-dark-subtle text-light-subtle self-start  dark:peer-focus:text-accent peer-focus:text-primary transition"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
