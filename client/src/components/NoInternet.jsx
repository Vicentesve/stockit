import React from "react";

const NoInternet = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="ml-2 text-5xl font-semibold text-gray-500 dark:text-gray-400">
        Unnable to connect to the internet
      </h1>
      <p className="mb-3 text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
        Your computer isn't connected to the internet
      </p>
      <img
        className="h-[200px] sm:h-fit"
        src="./images/no-connection.png"
        alt=""
      />
    </div>
  );
};

export default NoInternet;
