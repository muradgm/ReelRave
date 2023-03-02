import React from "react";
import MovieListItem from "./MovieListItems";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";

const movieInfo = [
  {
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    title: "The Avengers",
    genres: ["Action", "Sci-Fi"],
    status: "Public",
    rating: "8.0",
    duration: "2h 30m",
    year: 2012,
    storyline:
      "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D.",
  },
  {
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_FMjpg_UX1000_.jpg",
    title: "The Avengers: Age Of Ultron",
    genres: ["Action", "Sci-Fi", "Adventure"],
    status: "Private",
    rating: "7.3",
    duration: "2h 21m",
    year: 2015,
    storyline:
      "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plans",
  },
  {
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmE2vwxy5KaCu7cRuYYdgNdQKddux5OYgGwsPo0kqP_xzLnsDV",
    title: "The Avengers: Infinity War",
    genres: ["Action", "Sci-Fi", "Adventure"],
    status: "Public",
    rating: "8.5",
    duration: "2h 29m",
    year: 2018,
    storyline:
      "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality.",
  },
  {
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    title: "The Avengers: Endgame",
    genres: ["Action", "Sci-Fi", "Adventure"],
    status: "Public",
    rating: "8.4",
    duration: "3h 1m",
    year: 2019,
    storyline:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
];

const LatestUploads = () => {
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
    <div className="bg-secondary dark:bg-white shadow p-5 rounded col-span-2">
      <h1 className="font-semibold text-2xl mb-10 text-accent dark:text-primary">
        Recent Uploads
      </h1>

      {/* <MovieListItem
        movieInfo={movieInfo}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
        onOpenClick={onOpenClick}
        editButtons={editButtons}
      /> */}

      {movieInfo.map(({ poster, title, genres, status, storyline }, index) => (
        <MovieListItem
          poster={poster}
          title={title}
          genres={genres}
          status={status}
          // storyline={storyline}
          key={index}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
          onOpenClick={onOpenClick}
          editButtons={editButtons}
          index={index}
          length={movieInfo.length}
        />
      ))}
    </div>
  );
};

export default LatestUploads;
