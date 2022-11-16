import React from "react";
import {
  Bars3Icon,
  ChevronRightIcon,
  CubeIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderMobile = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartSize } = useSelector((state) => state.store);

  return (
    <div className="sm:hidden sticky top-0 flex items-center justify-between p-2 text-sm text-white bg-slate-900 z-[100]">
      <div className="flex items-center space-x-2">
        <button>
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
  );
};

export default HeaderMobile;
