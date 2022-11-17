import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubSideNav } from "../../redux/sidenavSlice";

const BackGroundOpacity = () => {
  const dispatch = useDispatch();
  const { subsidenavValue } = useSelector((state) => state.sidenavState);

  return (
    <div
      className={`absolute top-0 w-full h-full bg-black_rgba transition-opacity duration-300 z-[80]  ease-out ${
        subsidenavValue ? "" : " hidden "
      }`}
    >
      <div className="z-[100] sticky top-0">
        <button
          onClick={() => dispatch(setSubSideNav(false))}
          className="absolute text-white h-7 right-6 top-3 hover:text-gray-400"
        >
          <XMarkIcon className="h-full" />
        </button>
      </div>
    </div>
  );
};

export default BackGroundOpacity;
