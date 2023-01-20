import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "./../redux/sidenavSlice";
import Logo from "./Logo";

const TopBar = () => {
  const dispatch = useDispatch();
  const sideNavState = useSelector((state) => state.sidenavState);

  return (
    <div className="flex items-center justify-between flex-initial w-full p-2 text-gray-500 dark:bg-gray-800 sm:hidden dark:text-gray-200">
      <Logo nameInline isMobile />
      <Bars3Icon
        onClick={() => dispatch(setIsOpen(sideNavState.value))}
        className="border border-transparent rounded-md cursor-pointer h-7 hover:bg-gray-100 hover:border-gray-300 dark:hover:bg-gray-700"
      />
    </div>
  );
};

export default TopBar;
