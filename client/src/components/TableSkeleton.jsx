import React from "react";

const TableSkeleton = ({ columns, data }) => {
  const RowSkeleton = ({ item, rowIndex }) => {
    return (
      <tr
        key={rowIndex}
        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
      >
        {columns.map((columnItem, i) => (
          <td className="px-6 py-4 animate-pulse" key={i}>
            {item[columnItem.value]}
          </td>
        ))}

        <td className="px-6 py-4 animate-pulse">
          <span className="block h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></span>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex flex-col flex-auto w-full h-full overflow-y-hidden">
      <div className="flex justify-end flex-initial p-2 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-[140px]"></div>
      </div>
      <div className="relative flex-auto overflow-x-auto overflow-y-scroll border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
        <table>
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns?.map((column, i) => (
                <th key={i} scope="col" className={`px-6 py-3 ${column.width}`}>
                  {column.label}
                </th>
              ))}
              <th scope="col" className={`px-6 py-3 w-[10%]`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) =>
              [...Array(20)].map((e, i) => (
                <RowSkeleton key={i} item={item} index={i} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-initial sm:mt-10 animate-pulse">
        <nav className="flex items-center justify-center space-x-10 lg:justify-between">
          <span className="hidden text-sm font-normal text-gray-500 lg:block dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1- 10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              100
            </span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                1
              </button>
            </li>
            <li>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                2
              </button>
            </li>
            <li>
              <button
                aria-current="page"
                className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </button>
            </li>
            <li>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                4
              </button>
            </li>
            <li>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                5
              </button>
            </li>
            <li>
              <button className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableSkeleton;
