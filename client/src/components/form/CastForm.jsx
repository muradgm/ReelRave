import React from "react";
import LiveSearch from "../LiveSearch";
import { classes } from "../../utils/theme";
import { renderItem, results } from "../admin/MovieForm";
import Submit from "./Submit";
import { useData, useNotification } from "../../hooks";

const CastForm = ({ onSubmit }) => {
  const { castInfo, setCastInfo, isKeyDown, setIsKeyDown, defaultCastInfo } =
    useData();
  const { updateNotification } = useNotification();

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });
    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name)
      return updateNotification("error", "Cast profile is missing!");
    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing!");

    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo });
    console.log(castInfo);
  };

  const { leadActor, profile, roleAs } = castInfo;
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        id="orange-checkbox"
        className="w-4 h-4 text-tertiary bg-gray-100 border-gray-300 rounded focus:ring-tertiary dark:focus:ring-tertiary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={leadActor}
        onChange={handleOnChange}
        title="Set as a lead actor"
      />
      <div className="min-w-[210px]">
        <LiveSearch
          placeholder="Search profile"
          value={profile.name}
          results={results}
          onSelect={handleProfileSelect}
          renderItem={renderItem}
          isKeyDown={isKeyDown}
          setIsKeyDown={setIsKeyDown}
        />
      </div>
      <span className="dark:text-light-subtle text-dark-subtle font-semibold">
        as
      </span>
      <div className="flex flex-grow">
        <input
          type="text"
          name="roleAs"
          className={`${classes} border rounded-lg p-1 h-10 text-sm`}
          placeholder="Role as"
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex flex-grow">
        <Submit
          onClick={handleSubmit}
          value="Add"
          styles="text-xs px-2"
          type="button"
        />
      </div>
    </div>
  );
};

export default CastForm;
