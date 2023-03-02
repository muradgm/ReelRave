import React, { useState } from "react";
import { searchActor } from "../api/actor";
import { useSearch } from "../hooks";
import { renderItem } from "../utils/helper";
import { inputWrapperClasses } from "../utils/theme";
import { LabelWithBadge } from "./form/Labels";
import LiveSearch from "./LiveSearch";

const WriterSelector = ({ onSelect, badge, crew, onClick }) => {
  const { handleSearch, resetSearch } = useSearch();
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleProfileChange = (e) => {
    const { value } = e.target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };
  const handleOnSelect = (profile) => {
    setValue("");
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  return (
    <div className={`${inputWrapperClasses} z-[109] relative`}>
      <LabelWithBadge
        htmlFor="writers"
        text="Writers"
        badge={badge}
        crew={crew}
        onClick={onClick}
      />
      <LiveSearch
        name="writers"
        placeholder="Search profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleProfileChange}
        value={value}
      />
    </div>
  );
};

export default WriterSelector;
