import {
  ChevronDownIcon,
  CubeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSearch from "./InputSearch";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { setHoverCard } from "../../redux/sidenavSlice";
import PopOverBase from "./PopOverBase";
const Header = ({ categories }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartSize, total } = useSelector((state) => state.store);

  const [popState, setPopState] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  };

  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  const resetBackGround = () => {
    setPopState(false);
    dispatch(setHoverCard(false));
  };

  const Account = () => {
    return (
      <div className="flex items-center p-2 space-x-3 border border-transparent cursor-pointer hover:border-white">
        <UserIcon className="h-7" />
        <div>
          {user ? (
            <h3 className="text-sm font-light text-gray-300">
              Hello, <span className="font-semibold ">{user.name}!</span>
            </h3>
          ) : (
            <a onClick={resetBackGround} href="/login" className="">
              Sign In
            </a>
          )}
          <div className="flex items-center -mt-1 space-x-2">
            <h3 className="font-semibold ">Account</h3>
            <ChevronDownIcon className="h-5" />
          </div>
        </div>
      </div>
    );
  };

  const AccountContent = () => {
    return (
      <div>
        <div className="flex flex-col items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-10 py-2 text-sm font-medium text-center text-white bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="login"
              onClick={resetBackGround}
              className="px-10 py-2 text-sm font-medium text-center text-white bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
            >
              Sign In
            </Link>
          )}
          {!user && (
            <p className="mt-1 text-xs font-light text-gray-500 dark:text-gray-400">
              New customer?{" "}
              <a href="/signup" className="text-blue-600 underline">
                Start here
              </a>
            </p>
          )}
        </div>

        <div className="w-[400px] flex justify-between p-5">
          <div className="w-[50%]">
            <h3 className="text-lg font-semibold">Your Lists</h3>
            <ul className="mt-3 text-gray-500 text-sx">
              <li className="cursor-pointer hover:underline">Create a list</li>
              <li className="cursor-pointer hover:underline">See your lists</li>
            </ul>
          </div>
          <div className="w-[50%]">
            <h3 className="text-lg font-semibold">Your Account</h3>
            <ul className="mt-3 text-gray-500 text-sx">
              <Link onClick={resetBackGround} to="/my-account">
                <li className="cursor-pointer hover:underline">Account</li>
              </Link>
              <li className="cursor-pointer hover:underline">Orders</li>
              {user?.hasWarehouse ? (
                <Link onClick={resetBackGround} to="/my-warehouse">
                  <li className="cursor-pointer hover:underline">
                    See my Warehouse
                  </li>
                </Link>
              ) : null}
              <li className="cursor-pointer hover:underline">Recomendations</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="items-center justify-between flex-grow hidden p-2 mx-auto space-x-10 text-sm sm:flex bg-slate-900">
      <Link to="/">
        <div className="flex items-center space-x-2 text-white">
          <CubeIcon className="h-8" />
          <h3 className="font-extrabold tracking-widest uppercase select-none whitespace-nowrap">
            Stock it
          </h3>
        </div>
      </Link>

      <InputSearch options={categories} />

      <div className="flex items-center space-x-10 text-white cursor-default">
        {/* Account */}
        {/* <HoverCardBase trigger={Account()} content={AccountContent()} /> */}
        <PopOverBase
          trigger={Account()}
          content={AccountContent()}
          open={popState}
          setOpen={setPopState}
        />

        {/* Return & order */}
        <Link to="/orders">
          <div className="p-2 border border-transparent cursor-pointer hover:border-white">
            <p className="font-light text-gray-300 ">Returns</p>
            <p className="-mt-1 font-semibold">& Orders</p>
          </div>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="flex items-center  p-2 space-x-3 border border-transparent hover:border-white cursor-pointer w-[110px]"
        >
          <div className="relative">
            <ShoppingCartIcon className="h-7" />
            <div className="absolute w-4 h-4 flex items-center justify-center text-[10px] font-semibold text-center text-black bg-yellow-300 rounded-full -right-[6px] -top-[6px]">
              <p>{cartSize}</p>
            </div>
          </div>
          <div>
            <p className="font-light text-gray-300">Total</p>
            <p className="-mt-1 text-xs font-semibold ">
              {total >= 1000 ? "+$999.00" : currencyFormat(total)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
