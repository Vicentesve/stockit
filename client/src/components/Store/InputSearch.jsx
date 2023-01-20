import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategoryId, setSearch } from "../../redux/inputSearchSlice";

const InputSearch = ({ options }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.inputSearch.search);
  const categoryId = useSelector((state) => state.inputSearch.categoryId);

  const onSubmit = (e) => {
    e.preventDefault();
    if (categoryId === 0) {
      navigate(`/search/all-categories/${search}`);
    } else {
      navigate(`/search/${categoryId}/${search}`);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex-grow ">
      <div className="flex">
        <select
          value={categoryId}
          onChange={(e) => dispatch(setCategoryId(e.target.value))}
          className=" z-10  py-2.5 px-4 text-sm font-medium 
        text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
        >
          <option value={0}>All categories</option>
          {options?.map((option, i) => (
            <option key={i} value={option._id}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
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
