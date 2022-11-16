import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../../redux/storeSlice";

const InputSearch = ({ options }) => {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.store);

  const [value, setValue] = useState(currentCategory);

  useEffect(() => {
    dispatch(changeCategory(value));
  }, [value, dispatch]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="flex-grow ">
      <div className="flex">
        <select
          value={currentCategory}
          onChange={onChange}
          className=" z-10  py-2.5 px-4 text-sm font-medium 
        text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
        >
          <option value={0}>All categories</option>
          {options?.map((option, i) => (
            <option key={i} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg 
            border border-transparent focus:ring-yellow-300 focus:border-yellow-300"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 py-2.5 px-4 text-sm font-medium text-black bg-yellow-300 
            rounded-r-lg  hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputSearch;
