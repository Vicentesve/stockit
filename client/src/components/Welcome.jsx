import React from "react";

export const Welcome = () => {
  return (
    <div className="flex flex-col flex-auto text-center sm:justify-center dark:bg-gray-800">
      <div className="px-5">
        <h1 className="mt-10 text-4xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Maximize the{" "}
          <span className="text-blue-600 dark:text-blue-500">efficiency</span>{" "}
          of your warehouse
        </h1>
        <p className="mt-5 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Modern online warehouse management software.
        </p>
      </div>
    </div>
  );
};
