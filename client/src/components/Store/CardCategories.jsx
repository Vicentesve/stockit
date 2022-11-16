import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeCategory } from "../../redux/storeSlice";

const CardCategories = ({ titleCard, categories }) => {
  const dispatch = useDispatch();

  const slicedArray = categories.slice(0, 4);

  return (
    <div className="h-[420px] w-[350px] border border-gray-300 rounded-sm shadow-lg bg-white z-30 p-5">
      <h2 className="text-2xl font-bold">{titleCard}</h2>

      <div className="h-[80%] mt-2 w-full grid grid-cols-2 gap-1 ">
        {slicedArray.map((item, i) => (
          <Link
            onClick={() => dispatch(changeCategory(item?._id))}
            className="overflow-hidden"
            key={i}
            to={`category/${item?._id}`}
          >
            <img
              className="object-cover h-[80%] w-full"
              src={item?.image}
              alt=""
            />
            <p className="text-sm font-light text-center ">{item?.name}</p>
          </Link>
        ))}
      </div>

      <p className="mt-3 text-sm text-blue-400 cursor-pointer hover:underline">
        See more
      </p>
    </div>
  );
};

export default CardCategories;
