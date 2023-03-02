import React from "react";

const Selector = ({ name, options, value, onChange, label }) => {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="h-10 border rounded-lg pl-2 outline-none transition bg-primary dark:bg-accent border-dark-subtle dark:border-light-subtle focus:border-accent dark:focus:border-primary text-dark-subtle dark:text-light-subtle custom-scrollbar focus:text-accent dark:focus:text-primary w-full"
    >
      <option>{label}</option>
      {options.map(({ value, title }, idx) => (
        <option key={idx} value={value}>
          {title}
        </option>
      ))}
    </select>
  );
};

export default Selector;
