import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";
import DataProvider from "./DataContext";

const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default ContextProvider;
