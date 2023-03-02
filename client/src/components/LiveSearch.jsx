import React, { useState, useRef, forwardRef } from "react";
import { useEffect } from "react";
import { useData } from "../hooks";
import { classes } from "../utils/theme";

const LiveSearch = ({
  value = "",
  placeholder,
  results = [],
  name,
  selectedResultStyle,
  resultContainerStyle,
  renderItem = null,
  inputStyle,
  onChange = null,
  onSelect,
}) => {
  const { isKeyDown, setIsKeyDown } = useData();
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };
  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      setDisplaySearch(false);
    }
  };
  const handleKeyDown = (e) => {
    let nextCount;
    const { key } = e;

    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
      setIsKeyDown(true);
      setFocusedIndex(nextCount);
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
      setIsKeyDown(true);
      setFocusedIndex(nextCount);
    }
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(results[focusedIndex]);
      setFocusedIndex(-1);
    }
    if (key === "Escape") {
      setDisplaySearch(false);
      setFocusedIndex(-1);
      setIsKeyDown(false);
    }
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".live-search") && displaySearch) {
        setDisplaySearch(false);
        setFocusedIndex(-1);
        setIsKeyDown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [displaySearch, setIsKeyDown]);
  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : `${classes} border h-10 rounded-lg p-2 text-sm`;
  };
  useEffect(() => {
    if (results.length) return setDisplaySearch(true);
    setDisplaySearch(false);
  }, [results.length]);

  return (
    <div className="relative live-search">
      <input
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        // onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
      />
      <SearchResults
        focusedIndex={focusedIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        isKeyDown={isKeyDown}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
};

export default LiveSearch;

const SearchResults = ({
  isKeyDown,
  visible,
  results,
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultRef = useRef();

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < results.length) {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedIndex, results]);

  if (!visible) return null;

  return (
    <div className="absolute right-0 left-0 top-10 bg-secondary text-accent dark:bg-accent mt-1 shadow-md space-y-2 py-2 max-h-64 overflow-auto custom-scrollbar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "bg-dark-subtle dark:bg-dark-subtle";
        };

        return (
          <ResultCard
            ref={index === focusedIndex ? resultRef : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onClick={() => onSelect(result)}
            focusedIndex={focusedIndex}
            index={index}
            isKeyDown={isKeyDown}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    isKeyDown,
    index,
    focusedIndex,
    item,
    renderItem,
    onClick,
    selectedResultStyle,
    resultContainerStyle,
  } = props;
  const getClasses = () => {
    if (resultContainerStyle)
      return `${resultContainerStyle} ${selectedResultStyle}`;
    return `${selectedResultStyle} cursor-pointer rounded overflow-hidden dark:hover:bg-light-subtle drop-shadow-md hover:bg-dark-subtle transition flex space-x-2 group`;
  };

  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      {renderItem(item, index, focusedIndex, isKeyDown)}
    </div>
  );
});
