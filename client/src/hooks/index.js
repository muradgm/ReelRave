import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";
import { DataContext } from "../context/DataContext";
import { SearchContext } from "../context/SearchProvider";

export const useTheme = () => useContext(ThemeContext);
export const useNotification = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
export const useData = () => useContext(DataContext);
export const useSearch = () => useContext(SearchContext);
