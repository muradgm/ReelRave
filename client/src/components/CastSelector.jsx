import React from "react";
import { renderItem } from "../utils/helper";
import { inputWrapperClasses } from "../utils/theme";
import CastForm from "./form/CastForm";
import { LabelWithBadge } from "./form/Labels";

const CastSelector = ({ crew, onClick, onSubmit, onSelect, movieInfo }) => {
  return (
    <div className={`${inputWrapperClasses} z-[108] relative`}>
      <LabelWithBadge
        htmlFor="castAndCrew"
        text="Cast & Crew"
        crew={crew}
        onClick={onClick}
      />
      <CastForm
        name="castAndCrew"
        renderItem={renderItem}
        onSubmit={onSubmit}
        onSelect={onSelect}
        movieInfo={movieInfo}
      />
    </div>
  );
};

export default CastSelector;
