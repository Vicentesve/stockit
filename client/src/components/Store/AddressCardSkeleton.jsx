import React from "react";

const AddressCardSkeleton = () => {
  return (
    <div className="cursor-pointer flex flex-col justify-between p-4 w-[320px] h-[260px] border border-gray-300 rounded-md text-sm animate-pulse">
      <div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-14 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-2.5"></div>
      </div>

      <div className="flex space-x-3">
        <div className="w-20 h-3 p-2 bg-gray-200 rounded-md dark:bg-gray-700 "></div>
        <span>|</span>
        <div className="w-20 h-3 p-2 bg-gray-200 rounded-md dark:bg-gray-700 "></div>
      </div>
    </div>
  );
};

export default AddressCardSkeleton;
