import React from "react";
import {
  Bars3Icon,
  ChevronRightIcon,
  CubeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSubSideNav } from "../../redux/sidenavSlice";
import { setCategoryId, setSearch } from "../../redux/inputSearchSlice";

const HeaderMobile = ({ options }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cartSize = useSelector((state) => state.store.cartSize);
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
    <div className="sm:hidden sticky top-0  p-2 text-sm text-white bg-slate-900 z-[80]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button onClick={() => dispatch(setSubSideNav(true))}>
            <Bars3Icon className="h-6" />
          </button>

          <Link to="/">
            <div className="flex items-center space-x-2 text-white">
              <CubeIcon className="h-5" />
              <h3 className="text-sm font-extrabold tracking-widest uppercase select-none whitespace-nowrap">
                Stock it
              </h3>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-2">
              <p className="flex items-center space-x-2">
                <span>{user.name}</span>
                <ChevronRightIcon className="h-3" />
              </p>
              <UserIcon className="h-6" />
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2">
              <p className="flex items-center space-x-2">
                <span>Sign Up</span> <ChevronRightIcon className="h-3" />
              </p>
              <UserIcon className="h-6" />
            </Link>
          )}

          <Link to="cart" className="relative">
            <ShoppingCartIcon className="h-6" />
            <div className="absolute flex items-center justify-center w-3 h-3 text-xs text-black bg-yellow-300 rounded-full -right-1 -top-1 ">
              <p>{cartSize}</p>
            </div>
          </Link>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex-grow my-3">
        <div className="flex">
          <select
            value={categoryId}
            onChange={(e) => dispatch(setCategoryId(e.target.value))}
            className="z-10 py-1 px-[10px] text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
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
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="z-20 block w-full p-1 text-sm text-gray-900 border border-transparent rounded-r-lg bg-gray-50 focus:ring-yellow-300 focus:border-yellow-300"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-1 text-sm font-medium text-black bg-yellow-300 rounded-r-lg hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300"
            >
              <svg
                aria-hidden="true"
                className="w-[22px] h-[22px]"
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
    </div>
  );
};

export default HeaderMobile;
