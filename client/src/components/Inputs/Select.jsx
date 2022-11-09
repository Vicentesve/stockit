import React from "react";

const Select = ({ options, label, id, errors, value, onChange }) => {
  return (
    <div className="relative z-0">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="0" className="text-gray-400" defaultValue>
          Choose a {label}
        </option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      <span className="absolute text-xs font-medium text-red-600 dark:text-red-400">
        {errors}
      </span>
    </div>
  );
};

export default Select;
