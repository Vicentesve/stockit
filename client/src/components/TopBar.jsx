import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "./../redux/sidenavSlice";
const TopBar = () => {
  const dispatch = useDispatch();
  const sideNavState = useSelector((state) => state.sidenavState);

  return (
    <div className="w-full p-2 text-gray-500 sm:hidden h-fit dark:text-gray-200">
      <Bars3Icon
        onClick={() => dispatch(setIsOpen(sideNavState.value))}
        className="border border-transparent rounded-md cursor-pointer h-7 hover:bg-gray-100 hover:border-gray-300 dark:hover:bg-gray-700"
      />
    </div>
  );
};

export default TopBar;
