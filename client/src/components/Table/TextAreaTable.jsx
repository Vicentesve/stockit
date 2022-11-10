import React from "react";

const TextAreaTable = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  errors,
  rows,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        onChange={onChange}
        className="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      ></textarea>
      <span className="absolute mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {errors}
      </span>
    </div>
  );
};

export default TextAreaTable;
