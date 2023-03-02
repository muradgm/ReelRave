import React, { useState } from "react";
import Submit from "./Submit";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";
import { useNotification } from "../../hooks";
import { classes } from "../../utils/theme";
import { nationalityOptions } from "../../utils/options";
import { CgSpinner } from "react-icons/cg";

const defaultActorInfo = {
  name: "",
  about: "",
  gender: "",
  avatar: null,
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
];

const validateActor = ({ avatar, name, gender, about }) => {
  if (!name.trim()) return { error: "Actor name is missing!" };
  if (!about.trim()) return { error: "About section is empty!" };
  if (!gender.trim()) return { error: "Actor gender is missing!" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image file!" };

  return { error: null };
};

const ActorForm = ({ title, btnTitle, onSubmit, loading }) => {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  const { updateNotification } = useNotification();

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);

    setSelectedAvatarForUI(url); // this will create a url from this poster
  };

  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);

    const formData = new FormData();
    for (let key in actorInfo) {
      formData.append(key, actorInfo[key]);
    }

    onSubmit(actorInfo);
  };
  const { name, about, gender, birthDate, nationality } = actorInfo;

  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-accent bg-primary text-accent dark:text-primary p-3 w-[35rem]"
    >
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CgSpinner size={48} className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-semibold text-xl">{title}</h1>
            <Submit value={`${btnTitle}`} styles="w-2/12 h-8" type="submit" />
          </div>
          <div className="flex space-x-4 h-full">
            <PosterSelector
              selectedPoster={selectedAvatarForUI}
              name="avatar"
              onChange={handleChange}
              className="w-36 h-48 object-cover object-center rounded-lg"
              label="Select Avatar"
              accept="image/jpg, image/jpeg, image/png, image/webp"
            />
            <div className="flex-grow flex flex-col space-y-2">
              <div className="flex space-x-2 ">
                <input
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={name}
                  className={`${classes} border h-10`}
                />
                <Selector
                  options={genderOptions}
                  label="Gender"
                  value={gender}
                  onChange={handleChange}
                  name="gender"
                />
              </div>
              <div className="flex space-x-2 ">
                <input
                  type="date"
                  name="birthDate"
                  onChange={handleChange}
                  value={birthDate}
                  className={`${classes} border h-10`}
                />
                <Selector
                  options={nationalityOptions}
                  label="Nationality"
                  value={nationality}
                  onChange={handleChange}
                  name="nationality"
                />
              </div>
              <div className="h-full">
                <textarea
                  placeholder="Enter about"
                  name="about"
                  onChange={handleChange}
                  value={about}
                  className={`${classes} border resize-none h-full`}
                ></textarea>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default ActorForm;
