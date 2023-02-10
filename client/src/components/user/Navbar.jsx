import React from "react";
import Container from "../Container.jsx";
import { useAuth, useTheme } from "../../hooks/index.js";
import { Link } from "react-router-dom";
import { BsFillSunFill } from "react-icons/bs";

export const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="dark:bg-secondary bg-accent drop-shadow">
      <Container classes="p-2">
        <div className="flex justify-between items-center font-roboto">
          <div className="logo text-3xl text-tertiary font-black">
            <Link to="/">ReelRave</Link>
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-accent  bg-primary p-1 rounded"
              >
                <BsFillSunFill
                  className="dark:text-secondary text-accent"
                  size={24}
                />
              </button>
            </li>
            <li>
              <input
                type="text"
                placeholder="search..."
                className="border-2 dark:border-dark-subtle border-light-subtle px-2 rounded bg-transparent text-xl outline-none dark:focus:border-accent focus:border-primary transition dark:text-accent text-primary "
              />
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  className="dark:text-accent text-primary font-semibold text-lg"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/auth/sign-in"
                  className="dark:text-accent text-primary font-semibold text-lg"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};
