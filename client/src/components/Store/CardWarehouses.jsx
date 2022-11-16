import React from "react";
import { Link } from "react-router-dom";

const CardWarehouses = ({ titleCard, warehouse }) => {
  return (
    <div className="h-[420px] w-[350px] border border-gray-300 rounded-sm shadow-lg bg-white z-30 p-5">
      <h2 className="text-2xl font-bold">{titleCard}</h2>

      <div className="h-[80%] mt-2 w-full grid grid-cols-2 gap-1 ">
        {[...Array(4)].map((e, i) => (
          <Link
            to={`/warehouse/${warehouse[i]?._id}`}
            key={i}
            className="overflow-hidden cursor-pointer "
          >
            {warehouse[i]?.products[0] ? (
              <>
                <img
                  className="object-cover h-[80%] w-full"
                  src={warehouse[i]?.products[i]}
                  alt=""
                />
                <p className="text-sm font-light text-center ">
                  {warehouse[i]?.name}
                </p>
              </>
            ) : null}
          </Link>
        ))}
      </div>

      <p className="mt-3 text-sm text-blue-400 cursor-pointer hover:underline">
        See more
      </p>
    </div>
  );
};

export default CardWarehouses;
