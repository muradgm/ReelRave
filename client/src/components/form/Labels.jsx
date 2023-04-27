export const Label = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-md font-semibold">
      {text}
    </label>
  );
};

export const LabelWithBadge = ({ children, onClick, htmlFor, text, crew }) => {
  const renderAll = () => {
    if (crew.length === 0) return;
    onClick();
  };
  const viewWritersText = () => {
    return crew && crew.length
      ? crew.length === 1
        ? "View Profile"
        : `View All `
      : null;
  };
  const RenderBadge = () => {
    return (
      <div
        className={` ${crew
          .map((obj) =>
            obj.profile ? "md:right-[15.15rem] right-[14.475rem]" : "right-1"
          )
          .join(
            " "
          )} z-[145] flex flex-col items-end absolute top-[.65rem]  space-y-1`}
      >
        <button
          type="button"
          onClick={renderAll}
          className={`text-accent dark:text-primary hover:underline transition text-xs`}
        >
          {viewWritersText()}
        </button>
        <div className="flex -space-x-3">
          {crew.slice(0, 2).map((obj, idx) => (
            <img
              key={idx}
              src={obj?.avatar || obj.profile?.avatar}
              alt={obj.name || obj.profile.name}
              className="w-9 h-9 border-2 border-primary dark:border-accent rounded-full"
            />
          ))}
          {crew.length > 1 && (
            <button
              onClick={onClick}
              type="button"
              className="flex items-center justify-center w-9 h-9 text-sm font-medium text-accent dark:text-accent bg-gray-700 border-2 dark:border-accent rounded-full hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 border-gray-800 cursor-pointer"
            >
              {`${crew.length}+`}
            </button>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="relative w-full">
      <Label htmlFor={htmlFor} text={text}>
        {children}
      </Label>
      {RenderBadge()}
    </div>
  );
};

export const EditButtons = ({ onClick, children, title, index }) => {
  return (
    <button
      key={index}
      type="button"
      onClick={onClick}
      className="hover:bg-gray-500 hover:bg-opacity-70 rounded-full p-2 transition cursor-pointer"
      title={title}
    >
      {children}
    </button>
  );
};
