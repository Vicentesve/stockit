import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { setSubSideNav } from "../redux/sidenavSlice";

const SubSidenav = ({ module }) => {
  const dispatch = useDispatch();
  const subSideNavState = useSelector((state) => state.sidenavState);

  const location = useLocation();
  const currentPage = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  return (
    <div className="flex w-full text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
      <div
        className={` lg:block ${
          subSideNavState.subsidenavValue ? "block" : "hidden"
        }`}
      >
        <div className="h-screen p-5 w-fit">
          {/* Título */}
          <h2 className="font-semibold">{module.name}</h2>

          {/* Sub-menus */}
          <ul className="flex flex-col mt-5 space-y-1">
            {module.submenus.map(({ name, Icon }, i) => (
              <NavLink
                onClick={() => dispatch(setSubSideNav(false))}
                key={i}
                to={name.replaceAll(" ", "-").toLowerCase()}
              >
                <li
                  className={`flex items-center border border-transparent p-2 space-x-1 text-sm rounded-md whitespace-nowrap hover:bg-cyan-50 
                hover:border-gray-200 dark:hover:border-gray-700 dark:hover:bg-gray-700 ${
                  currentPage === name.replaceAll(" ", "-").toLowerCase()
                    ? "bg-cyan-50 border-gray-200 dark:bg-gray-700 dark:border-gray-700"
                    : ""
                }`}
                >
                  <Icon className="h-5" />
                  <p>{name}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SubSidenav;
