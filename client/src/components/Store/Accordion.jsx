import { ChevronRightIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Accordion = ({
  isLoading,
  Icon,
  condition,

  selectedTitle,
  selectedContent,
  noContentTitle,
  legentToNoContent,
  link,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-3 border border-gray-300 rounded-md ">
      {isLoading ? (
        <button className="flex items-center justify-between w-full p-3 bg-white rounded-md animate-pulse">
          <div className="flex w-full space-x-2">
            <Icon className="h-6" />
            <div className="w-full ">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full  mb-[5px]"></div>
              <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-64 "></div>
            </div>
          </div>
          <ChevronRightIcon className="h-7" />
        </button>
      ) : (
        <>
          {options ? (
            condition ? (
              <button
                type="button"
                onClick={() => (options ? setIsOpen(!isOpen) : null)}
                className={`flex items-center justify-between w-full  p-3 hover:bg-gray-200  ${
                  isOpen
                    ? "bg-gray-200 rounded-t-md rounded-x-md"
                    : "bg-white rounded-md"
                } `}
              >
                <div className="flex space-x-2 w-[90%] sm:w-full">
                  <Icon className="h-6" />
                  <div className="w-[90%] sm:w-full">
                    <h4 className="font-semibold text-left">{selectedTitle}</h4>
                    <p className="text-sm text-left text-gray-400">
                      {selectedContent}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon
                  className={`h-7 transform duration-500    ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>
            ) : (
              <div className="p-3">
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-2 ">
                    <NoSymbolIcon className="h-6" />
                    <span className="font-semibold">{noContentTitle}</span>
                  </div>
                  <Link to={link} className="text-sm text-blue-400 underline">
                    {legentToNoContent}
                  </Link>
                </div>
              </div>
            )
          ) : (
            <button
              type="button"
              onClick={() => (options ? setIsOpen(!isOpen) : null)}
              className={`flex items-center justify-between w-full  p-3 hover:bg-gray-200  ${
                isOpen
                  ? "bg-gray-200 rounded-t-md rounded-x-md"
                  : "bg-white rounded-md"
              } `}
            >
              <div className="flex space-x-2">
                <Icon className="h-6" />
                <div>
                  <h4 className="font-semibold text-left">{selectedTitle}</h4>
                  <p className="text-sm text-left text-gray-400">
                    {selectedContent}
                  </p>
                </div>
              </div>
              <ChevronRightIcon
                className={`h-7 transform duration-500    ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>
          )}

          {/* Options */}
          {options ? (
            <div>
              <div
                className={`h-fit overflow-hidden animate-in fade-in duration-500  ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <ul className="px-3 py-2 space-y-3 text-sm">{options}</ul>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Accordion;
