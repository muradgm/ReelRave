import React, { useState } from "react";
import { searchActor } from "../api/actor.js";
import { useSearch } from "../hooks/index.js";
import { renderItem } from "../utils/helper.js";
import { inputWrapperClasses } from "../utils/theme.js";
import { Label } from "./form/Labels.jsx";
import LiveSearch from "./LiveSearch.jsx";

const DirectorSelector = ({ onSelect }) => {
  const { handleSearch, resetSearch } = useSearch();
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleProfileChange = (e) => {
    const { value } = e.target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  return (
    <div className={`${inputWrapperClasses} z-[110] relative`}>
      <Label htmlFor="director" text="Director" />
      <LiveSearch
        name="director"
        value={value}
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleProfileChange}
      />
    </div>
  );
};
//(result) => updateDirector(result)

export default DirectorSelector;
