import React from "react";

const InputFieldFloat = ({ id, error, type, value, onChange }) => {
  return (
    <div className="relative z-0">
      <input
        type={type}
        id={id}
        name={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
           appearance-none dark:text-white focus:outline-none focus:ring-0 peer 
          ${
            error
              ? "border-red-600 dark:border-red-500 dark:focus:border-red-500 focus:border-red-600"
              : "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600"
          }`}
      />

      <label
        htmlFor={id}
        className="capitalize absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 
        scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {id}
      </label>

      <p className="absolute mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {error}
      </p>
    </div>
  );
};

export default InputFieldFloat;
