import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";
import DataProvider from "./DataContext";
import SearchProvider from "./SearchProvider";

const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <SearchProvider>
        <AuthProvider>
          <DataProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </SearchProvider>
    </NotificationProvider>
  );
};

export default ContextProvider;
