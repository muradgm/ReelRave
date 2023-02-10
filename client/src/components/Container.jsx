import React from "react";

const Container = ({ children, classes }) => {
  return (
    <div className={`max-w-screen-xl mx-auto ${classes}`}>{children} </div>
  );
};

export default Container;
