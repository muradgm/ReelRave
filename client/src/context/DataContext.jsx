import React, { createContext, useState } from "react";

export const DataContext = createContext();

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const DataProvider = ({ children }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [isKeyDown, setIsKeyDown] = useState(false);

  return (
    <DataContext.Provider
      value={{
        castInfo,
        setCastInfo,
        isKeyDown,
        setIsKeyDown,
        defaultCastInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
