import React from "react";

const OrderTableSkeleton = () => {
  return (
    <div className="w-full lg:w-[70%] text-sm animate-pulse">
      <div className="items-center p-2 space-y-3 text-gray-500 uppercase border-t border-gray-400 sm:space-y-0 sm:flex sm:justify-between border-x rounded-t-md bg-gray-200/60">
        <div className="flex justify-between space-x-5 sm:justify-start">
          <div className="space-y-2">
            <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-16 "></div>
            <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 w-44 "></div>
          </div>
          <div className="space-y-2">
            <div className="h-2.5 bg-gray-400 rounded-full dark:bg-gray-700 w-16 "></div>
            <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 w-44 "></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 w-44 "></div>
          <div className="flex items-center space-x-2 text-blue-400 normal-case ">
            <div className="w-24 h-2 bg-gray-400 rounded-full dark:bg-gray-700 "></div>
            <span className="text-gray-500">|</span>
            <div className="w-24 h-2 bg-gray-400 rounded-full dark:bg-gray-700 "></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border border-gray-400 rounded-b-md">
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 "></div>

          <div className="flex mt-5 space-x-5">
            <div className="flex justify-center items-center w-[90px] h-[90px] bg-gray-300 rounded  dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

              <div className="flex mt-2 space-x-2">
                <div className="w-24 px-2 py-1 bg-gray-200 rounded-md h-7 dark:bg-gray-700"></div>
                <div className="w-24 px-2 py-1 bg-gray-200 rounded-md h-7 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTableSkeleton;
