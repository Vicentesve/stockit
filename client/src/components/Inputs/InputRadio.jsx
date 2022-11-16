import React from "react";

const InputRadio = ({ label, options, id, register, validation, errors }) => {
  return (
    <div className="relative">
      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {options.map((option, i) => (
          <li
            key={i}
            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
          >
            <div className="flex items-center pl-3">
              <input
                id={id}
                type="radio"
                value={option.value}
                name="list-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                {...register(id, validation)}
              />
              <label
                htmlFor={id}
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {option.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <span
        className={`text-red-600 absolute text-xs italic ${
          errors ? "flex space-x-0.5 items-center" : "hidden"
        }`}
      >
        {errors}
      </span>
    </div>
  );
};

export default InputRadio;
