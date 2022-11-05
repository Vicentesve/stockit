import React from "react";

export const Welcome = () => {
  return (
    <div className="flex flex-col justify-center h-screen text-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to{" "}
        <span className="text-blue-600 dark:text-blue-500">the world's #1</span>{" "}
        logistics management software.
      </h1>
      <p className="p-10 mb-6 text-sm font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        StockIt is a system capable of managing large inventories with the
        ability to make changes as needed, while also having the ability to keep
        track of product statistics. The system will also provide a customer
        service interface, where{" "}
        <a
          className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
          href="https://www.amazon.com"
        >
          Amazon
        </a>{" "}
        customers will have the ability to directly consult products and order
        them as well as having access to their current order ‘cart’ and order
        history.
      </p>
      <button className="inline-flex items-center justify-center px-5 py-3 mx-auto text-base font-medium text-center text-white bg-blue-700 rounded-lg w-fit hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
        Let's start
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
