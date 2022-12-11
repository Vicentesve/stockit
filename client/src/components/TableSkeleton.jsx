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
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
        </td>
      </tr>
    );
  };

  return (
    <div className="relative border border-gray-200 shadow-lg dark:border-transparent sm:rounded-md h-[450px] xl:h-[500px] 2xl:h-[750px] overflow-hidden">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
  );
};

export default TableSkeleton;
