import React from "react";

const SelectFloat = ({ options, label, value, onChange, id, error }) => {
  return (
    <div className="relative z-0">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`block w-full text-sm  bg-transparent py-2.5 px-0 border-0 border-b-2  outline-none appearance-none 
        dark:bg-gray-800 bg-gray-50 focus:outline-none focus:ring-0  dark:placeholder-gray-400 
        ${
          error
            ? "border-red-600 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
            : "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
        } 
        ${
          value === "0"
            ? "dark:text-gray-400 text-gray-900"
            : "dark:text-white text-black"
        }`}
      >
        <option value="0" className="text-gray-400">
          Choose a {label}
        </option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      <p className="absolute mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {error}
      </p>
    </div>
  );
};

export default SelectFloat;
