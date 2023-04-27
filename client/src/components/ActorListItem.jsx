import React, { useState } from "react";
import { actors } from "../utils/actors";
import { EditButtons } from "./form/Labels";

const ActorListItem = ({ actor, index }) => {
  const [show, setShow] = useState(false);

  const { name, avatar, birthPlace, birthDate, nationality, about, age } =
    actor;
  // const date = new Date(birthDate);
  // const options = { year: "numeric", month: "long", day: "numeric" };
  // const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="flex" key={index}>
      <div className="min-w-[80px] max-w-[80px] min-h-[112px] max-h-[112px] overflow-hidden">
        <img src={avatar} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col ml-2">
        <div className="flex flex-col">
          <div className="capitalize text-tertiary text-xl tracking-wide">
            {name}
          </div>
          {/* <span className="mt-1 text-gray-500 text-sm flex flex-col">
              <span>
                <span className="text-xs text-accent dark:text-secondary">
                  <strong className="text-gray-500">Born</strong>{" "}
                  {formattedDate} <span className=" text-tertiary">in</span>
                </span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="text-xs text-accent dark:text-secondary">
                  {birthPlace}.
                </span>
              </span>
            </span> */}
          <span className="text-sm text-gray-500">{nationality}</span>
        </div>
        {/* <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{age} years old</span>
          </div> */}
        <div className="text-sm text-accent dark:text-secondary mt-1 leading-5">
          {about.split(" ").slice(0, 15).join(" ").concat("...")}
        </div>
      </div>
    </div>
  );
};

export default ActorListItem;
