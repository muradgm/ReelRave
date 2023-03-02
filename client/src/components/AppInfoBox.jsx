import React from "react";

const AppInfoBox = ({ title, subtitle }) => {
  return (
    <div className="bg-secondary shadow dark:bg-white p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-accent dark:text-primary">
        {title}
      </h1>
      <p className="text-xl text-accent dark:text-primary">{subtitle}</p>
    </div>
  );
};

export default AppInfoBox;
