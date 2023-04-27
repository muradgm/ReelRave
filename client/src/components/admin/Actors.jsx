import React, { useEffect, useRef, useState } from "react";
// import { actors } from "../../utils/actors";
import {
  BsBoxArrowUpRight,
  BsCheckLg,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import ActorListItem from "../ActorListItem";
import { EditButtons } from "../form/Labels";
import { getActors } from "../../api/actor";
import { useNotification } from "../../hooks";
import NextPrevButtons from "../NextPrevButtons";
import { EditOverlay } from "../MovieListItems";

const limit = 12;
let currentPage = 0;

const Actors = () => {
  const [show, setShow] = useState([]);
  const { updateNotification } = useNotification();
  const [actors, setActors] = useState([]);
  const [last, setLast] = useState(false);
  const [totalActorPages, setTotalActorPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);

  const fetchActors = async (page) => {
    const { profiles, error, totalPages } = await getActors(page, limit);
    if (error) return updateNotification("error", error);

    if (totalPages === 0) return setLast(true);

    setActors([...profiles]);
    setTotalActorPages(totalPages);
  };

  const handleOnNextClick = () => {
    if (last) return;
    currentPage += 1;
    fetchActors(currentPage);
  };

  const handleOnPrevClick = () => {
    if (currentPage <= 0) return;
    currentPage -= 1;
    fetchActors(currentPage);
  };

  useEffect(() => {
    fetchActors(currentPage);
  }, []);

  const handleOnMouseEnter = (id) => {
    console.log("Mouse entered actor", id);
    setShow((prev) => ({ ...prev, [id]: true }));
  };
  const handleOnMouseLeave = (id) => {
    setShow((prev) => ({ ...prev, [id]: false }));
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

  return (
    <>
      <div className="z-[99] relative mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {actors.map((actor, index) => {
          return (
            <div
              key={actor.id}
              className="bg-secondary dark:bg-accent shadow rounded h-full w-full overflow-hidden p-2 relative"
              onMouseEnter={() => handleOnMouseEnter(actor.id)}
              onMouseLeave={() => handleOnMouseLeave(actor.id)}
            >
              <div className="flex container w-full h-full p-1">
                <ActorListItem
                  actor={actor}
                  index={actor.id}
                  key={actor.id}
                  editButtons={editButtons}
                  onDeleteClick={onDeleteClick}
                  onEditClick={onEditClick}
                  onOpenClick={onOpenClick}
                />
              </div>
              {show[actor.id] && (
                <EditOverlay show={show} index={actor.id}>
                  {editButtons.map(({ onClick, icon, title }, idx) => (
                    <EditButtons
                      onClick={() => onClick(actor.id)}
                      title={title}
                      key={`${actor.id}-${idx}`}
                      index={idx}
                    >
                      {icon}
                    </EditButtons>
                  ))}
                </EditOverlay>
              )}
            </div>
          );
        })}
      </div>
      <NextPrevButtons
        onNextClick={() => handleOnNextClick()}
        onPreviousClick={() => handleOnPrevClick()}
        disableNext={currentPage === totalActorPages - 1}
        disablePrev={currentPage === 0}
        pageNumber={`${currentPage + 1} of ${totalActorPages}`}
      />
    </>
  );
};

export default Actors;
