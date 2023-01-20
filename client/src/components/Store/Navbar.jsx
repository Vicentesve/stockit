import { Link } from "react-router-dom";
import React from "react";

const Navbar = ({ categories }) => {
  return (
    <div className="flex items-center p-3 space-x-5 overflow-x-scroll text-sm text-white sm:p-1 bg-slate-800 ">
      {/* <button className="flex items-center space-x-1 hover:underline">
        <Bars3Icon className="h-5 sm:h-7" />
        <span>All</span>
      </button> */}
      {categories?.map((categorie, i) => (
        <Link
          to={`/category/${categorie?._id}`}
          key={i}
          className=" hover:underline whitespace-nowrap"
        >
          {categorie.label}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
