import React, { createContext, useState } from "react";
import { useNotification } from "../hooks/index.js";

export const SearchContext = createContext();

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
const SearchProvider = ({ children }) => {
  const { updateNotification } = useNotification();
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  // const isSearch = debounce(async (searchTerm) => {
  //   if (searchTerm.length > 0) {
  //     setSearching(true);
  //     const res = await fetch(`/api/search/${searchTerm}`);
  //     const data = await res.json();
  //     if (data.length > 0) {
  //       setSearchResults(data);
  //       setResultNotFound(false);
  //     } else {
  //       setSearchResults([]);
  //       setResultNotFound(true);
  //     }
  //     setSearching(false);
  //   } else {
  //     setSearchResults([]);
  //     setResultNotFound(false);
  //   }
  // }, 500);

  const search = async (method, query, updaterFun) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);

    if (!results.length) return setResultNotFound(true);

    setSearchResults(results);
    updaterFun && updaterFun([...results]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updaterFun) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFun && updaterFun([]);
      resetSearch();
    }

    debounceFunc(method, query, updaterFun);
    updaterFun([...searchResults]);
  };

  const resetSearch = () => {
    setSearchResults([]);
    setResultNotFound(false);
    setSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searching,
        searchResults,
        resultNotFound,
        handleSearch,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
