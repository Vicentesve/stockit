import React from "react";
import { useState } from "react";

const ToolTip = ({ tooltip, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative inline-block overflow-visible "
    >
      <div
        className={`absolute top-[-35px] py-1 px-2 overflow-visible transition duration-200 bg-cyan-50 border border-gray-300 
        shadow-md rounded-md z-[99999] translate-x-[-30%] dark:border-gray-700 text-gray-500 dark:bg-gray-700 dark:text-gray-200  ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-xs tracking-wide capitalize">{tooltip}</div>
        <div className="absolute bottom-0 w-2 h-2 transform rotate-45 -translate-x-1/2 translate-y-[60%] border-b border-r border-gray-300 dark:border-gray-700 bg-cyan-50 dark:bg-gray-700 left-1/2"></div>
      </div>
      {content}
    </div>
  );
};

export default ToolTip;
