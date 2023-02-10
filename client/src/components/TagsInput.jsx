import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = ({ name, onChange, value }) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const tagsInput = useRef();
  const input = useRef();

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") {
      setTag(value);
    }
  };

  const handleOnKeyDown = (e) => {
    const { key } = e;
    if (key === "," || key === "Enter") {
      e.preventDefault();
      if (!tag) return;

      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      setTag("");
    }
    if (key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags([...newTags]);
  };
  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-light-subtle",
      "border-dark-subtle"
    );
    tagsInput.current.classList.add("dark:border-primary", "border-accent");
  };
  const handleOnBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-light-subtle",
      "border-dark-subtle"
    );
    tagsInput.current.classList.remove("dark:border-primary", "border-accent");
  };

  useEffect(() => {
    onChange(tags);
  }, [tags]);

  useEffect(() => {
    if (value.length) setTags(value);
  }, [value]);

  useEffect(() => {
    input.current.scrollIntoView();
  }, [tag]);

  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleOnKeyDown}
        className="border bg-transparent dark:border-light-subtle border-dark-subtle px-2 h-10 w-full text-accent dark:text-primary items-center flex space-x-2 rounded-lg transition overflow-x-auto custom-scrollbar "
      >
        {tags.map((t) => (
          <Tag onClick={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ))}
        <input
          ref={input}
          type="text"
          id={name}
          className="h-full flex-grow bg-transparent outline-none dark:text-primary text-accent text-sm"
          placeholder="Add tags"
          value={tag}
          onChange={handleChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
};

export default TagsInput;

const Tag = ({ children, onClick }) => {
  return (
    <span className="flex items-center space-x-1 bg-accent  dark:bg-secondary dark:text-white capitalize text-sm text-primary px-1 whitespace-nowrap rounded-md">
      <p>{children}</p>
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} className="" />
      </button>
    </span>
  );
};
