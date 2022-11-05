import React from "react";
import { CubeIcon } from "@heroicons/react/24/outline";

const Logo = ({ nameInline }) => {
  return (
    <div
      className={` text-gray-500 dark:text-gray-300 ${
        nameInline
          ? "flex space-x-2 items-center"
          : "space-y-2 flex flex-col items-center"
      }`}
    >
      <CubeIcon className="w-10 h-10 p-2 bg-white border border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:border-slate-700" />
      <h3
        className={`font-extrabold tracking-widest uppercase select-none whitespace-nowrap  ${
          !nameInline && "text-xs text-center"
        }`}
      >
        Stock it
      </h3>
    </div>
  );
};

export default Logo;
