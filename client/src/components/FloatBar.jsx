import {
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { setLogout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen, setSubSideNav } from "./../redux/sidenavSlice";

const FloatBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const sideNavState = useSelector((state) => state.sidenavState);

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const modules = [
    { name: "Dashboard", icon: Squares2X2Icon, url: "/dashboard" },
    { name: "Orders", icon: ClipboardIcon, url: "/orders" },
    { name: "Warehouse", icon: ArchiveBoxIcon, url: "/warehouse" },
  ];

  const onClickSettings = () => {
    dispatch(setIsOpen(sideNavState.value));
    dispatch(setSubSideNav(true));
  };

  return (
    <div
      className={`fixed z-10 w-full h-full ease-in-out transition duration-300 ${
        sideNavState.value ? "translate-x-0" : " -translate-x-full"
      }`}
    >
      <aside
        className={`absolute flex flex-col justify-between h-screen p-5 bg-cyan-50 dark:bg-gray-900 w-[80%]`}
      >
        <div>
          <div className="flex justify-end text-gray-500 dark:text-gray-200">
            <XMarkIcon
              onClick={() => dispatch(setIsOpen(sideNavState.value))}
              className="p-1 border border-transparent rounded-md h-7 hover:bg-white hover:border-gray-300 dark:hover:bg-gray-700"
            />
          </div>
          <Logo nameInline />

          {/* Modules */}
          <div className="flex flex-col mt-10 space-y-5">
            {modules.map(({ name, icon: Icon, url }, i) => (
              <NavLink
                onClick={() => dispatch(setIsOpen(sideNavState.value))}
                key={i}
                to={url}
                className={({ isActive }) =>
                  `text-gray-500 hover:bg-white hover:border-gray-300 border border-transparent rounded-md p-2 
        group dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-900 flex items-center space-x-2  ${
          isActive && "bg-white shadow-md dark:bg-gray-700 dark:border-gray-700"
        }`
                }
              >
                <Icon className="h-5" />
                <p>{name}</p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col space-y-2">
          {/* Settings */}
          <NavLink
            onClick={onClickSettings}
            to="/settings"
            className={({ isActive }) =>
              `text-gray-500 hover:bg-white hover:border-gray-300 border border-transparent rounded-md p-2 
              group dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-900 flex items-center space-x-2  ${
                isActive &&
                "bg-white shadow-md dark:bg-gray-700 dark:border-gray-700"
              }`
            }
          >
            <Cog6ToothIcon className="h-5" />
            <p>Settings</p>
          </NavLink>
          {/* Logout */}
          <NavLink
            to="/login"
            onClick={handleLogout}
            className={({ isActive }) =>
              `text-gray-500 hover:bg-white hover:border-gray-300 border border-transparent rounded-md p-2 
              group dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-900 flex items-center space-x-2  ${
                isActive &&
                "bg-white shadow-md dark:bg-gray-700 dark:border-gray-700"
              }`
            }
          >
            <ArrowRightOnRectangleIcon className="h-5" />
            <p>Logout</p>
          </NavLink>

          {/* Profile */}
          <div className="flex items-center pt-5 space-x-2 border-t border-gray-300 dark:border-slate-700">
            <img
              src={user?.profilePic}
              className="object-cover w-10 h-10 rounded-full"
              alt=""
            />
            <p className="text-gray-500 dark:text-gray-200">
              Hello, <span className="font-semibold">{user?.name}!</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default FloatBar;
