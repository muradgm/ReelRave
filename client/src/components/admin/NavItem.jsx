import { NavLink } from "react-router-dom";

const NavItem = ({ children, to }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        const activeClass = isActive
          ? "text-accent dark:text-primary font-semibold"
          : "text-gray-400 dark:text-gray-600";
        return `${activeClass} flex items-center text-lg space-x-2 p-2 dark:hover:text-primary hover:text-accent transition`;
      }}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
