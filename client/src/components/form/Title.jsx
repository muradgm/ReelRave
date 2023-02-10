import React from "react";

const Title = ({ children }) => {
  return (
    <h1 className="text-2xl dark:text-accent text-primary font-black text-center font-roboto">
      {children}
    </h1>
  );
};

export default Title;
