import React, { useEffect, useRef, useState } from "react";
import { actors } from "../../utils/actors";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import ActorListItem from "../ActorListItem";
import { EditButtons } from "../form/Labels";
import { getActors } from "../../api/actor";
import { useNotification } from "../../hooks";
import NextPrevButtons from "../NextPrevButtons";
import { EditOverlay } from "../MovieListItems";

const PER_PAGE = 12;
const TOTAL_PAGES = Math.ceil(actors.length / PER_PAGE);

const Actors = () => {
  const [show, setShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { updateNotification } = useNotification();

  const START_INDEX = (currentPage - 1) * PER_PAGE;
  const END_INDEX = START_INDEX + PER_PAGE;
  const ACTORS_TO_DISPLAY = actors.slice(START_INDEX, END_INDEX);

  const handleOnMouseEnter = (index) => {
    setShow((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };
  const handleOnMouseLeave = (index) => {
    setShow((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  const onNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };
  const onDeleteClick = () => {
    console.log("delete");
  };
  const onEditClick = () => {
    console.log("edit");
  };
  const onOpenClick = () => {
    console.log("open");
  };

  const editButtons = [
    {
      onClick: onEditClick,
      icon: <BsPencilSquare size={26} />,
      title: "Edit",
    },
    {
      onClick: onDeleteClick,
      icon: <BsTrash size={26} />,
      title: "Delete",
    },
    {
      onClick: onOpenClick,
      icon: <BsBoxArrowUpRight size={26} />,
      title: "Open",
    },
  ];

  // const [actors, setActors] = useState([]);
  // const [last, setLast] = useState(false);

  // const fetchActors = async (page) => {
  //   const {profiles, error}= await getActors(page, limit);
  //   if (error) return updateNotification("error", error);

  //   if (!profiles.length){
  //    currentPage = page - 1;
  //     return setLast(true);
  //}

  //   setActors([...profiles])
  // };

  // const handleOnNextClick = () => {
  //   if (last) return;
  //   currentPage += 1;
  //   fetchActors(currentPage);
  // };

  // const handleOnPrevClick = () => {
  //   if (currentPage <= 0) return;
  //   currentPage -= 1;
  //   fetchActors(currentPage);
  // };

  // useEffect(() => {
  //   fetchActors(currentPage);
  // }, []);

  return (
    <>
      <div className="z-[99] relative mt-32 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ACTORS_TO_DISPLAY.map((actor, index) => (
          <div
            key={index}
            className="bg-secondary dark:bg-accent shadow rounded h-full w-full overflow-hidden p-2 relative"
            onMouseEnter={() => handleOnMouseEnter(index)}
            onMouseLeave={() => handleOnMouseLeave(index)}
          >
            <div className="flex container w-full h-full p-1">
              <ActorListItem
                actor={actor}
                index={index}
                key={index}
                editButtons={editButtons}
                onDeleteClick={onDeleteClick}
                onEditClick={onEditClick}
                onOpenClick={onOpenClick}
              />
            </div>
            {show[index] && (
              <EditOverlay show={show} index={index}>
                {editButtons.map(({ onClick, icon, title }, index) => (
                  <EditButtons
                    onClick={onClick}
                    title={title}
                    key={index}
                    index={index}
                  >
                    {icon}
                  </EditButtons>
                ))}
              </EditOverlay>
            )}
          </div>
        ))}
      </div>
      <NextPrevButtons
        onNextClick={onNextClick}
        onPreviousClick={onPreviousClick}
        disableNext={currentPage === TOTAL_PAGES}
        disablePrev={currentPage === 1}
        pageNumber={`${currentPage} of ${TOTAL_PAGES}`}
      />
    </>
  );
};

export default Actors;
