import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { BiMoviePlay } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks";
const Navbar = () => {
  const { handleLogout } = useAuth();

  return (
    <nav className="w-48 min-h-screen bg-secondary dark:bg-accent drop-shadow border-r border-gray-900 dark:border-gray-300">
      <div className="flex flex-col justify-between pl-5 sticky top-0 h-screen">
        <ul>
          <li className="mb-10">
            <Link to="/">
              <div className="logo text-2xl text-tertiary font-black p-2">
                ReelRave
              </div>
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <IoHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <FaUserAstronaut />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-start pb-5 pl-3">
          <span className="font-semibold text-accent dark:text-primary text-xl">
            Admin
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-400 dark:text-gray-600 space-x-1 hover:text-accent dark:hover:text-primary transition text-sm"
          >
            {" "}
            <FiLogOut />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
