import React from "react";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const InputNumber = ({
  id,
  errors,
  label,
  placeholder,
  validation,
  control,
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={id}
        render={({ field: { onChange, name, value } }) => (
          <NumericFormat
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name={name}
            value={value}
            onChange={onChange}
            thousandSeparator=","
            decimalSeparator="."
            prefix="$"
            placeholder={placeholder}
          />
        )}
        rules={validation}
      />

      <span className="absolute text-xs font-medium text-red-600 dark:text-red-400">
        {errors}
      </span>
    </div>
  );
};

export default InputNumber;
