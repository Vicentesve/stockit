import React from "react";

const InputField = ({
  label,
  id,
  type,
  placeholder,
  register,
  validation,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...register(id, validation)}
      />
      <span className="absolute mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {errors}
      </span>
    </div>
  );
};

export default InputField;
