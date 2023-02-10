import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 dark:bg-primary bg-accent flex justify-center items-center">
      {" "}
      {/* //-z-10 */}
      {children}
    </div>
  );
};

export default FormContainer;
