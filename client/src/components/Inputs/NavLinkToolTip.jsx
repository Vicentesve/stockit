import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkToolTip = ({ url, Icon, name, onClick }) => {
  return (
    <>
      <NavLink
        to={url}
        className={({ isActive }) =>
          `text-gray-500 hover:bg-white hover:border-gray-300 border border-transparent rounded-md p-2 
              group dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-900 flex justify-center ${
                isActive &&
                "bg-white shadow-md dark:bg-gray-700 dark:border-gray-700"
              }`
        }
        data-tooltip-target={url}
        data-tooltip-placement="right"
        onClick={onClick}
      >
        <Icon className="h-6" />
      </NavLink>
      <div
        id={url}
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {name}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </>
  );
};

export default NavLinkToolTip;
