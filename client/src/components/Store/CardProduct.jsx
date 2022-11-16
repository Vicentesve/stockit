import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/storeSlice";

const CardProduct = ({ product, category }) => {
  const dispatch = useDispatch();
  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  return (
    <div className="h-[420px] w-[350px] border border-gray-300 rounded-md shadow-lg bg-white z-30">
      <div className="h-[50%]">
        <img
          className="object-cover w-full h-full rounded-t-md"
          src={product?.image}
          alt=""
        />
      </div>

      <div className="p-2">
        <h3 className="mt-2 text-xl font-bold">{product?.name}</h3>
        {category ? (
          <h3 className="mb-2 font-semibold text-gray-500">{category}</h3>
        ) : null}

        <p className="text-sm text-gray-500 line-clamp-2">
          {product?.description}
        </p>

        <div className="flex mt-1">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon
                key={`${i}_${product?._id}`}
                className="h-5 text-yellow-400"
              />
            ))}

          <p className="ml-2 text-sm text-blue-500 cursor-pointer hover:underline">
            {randomIntFromInterval(30000, 100000)}
          </p>
        </div>

        <div className="flex justify-between">
          <h4 className="mt-2 text-2xl font-bold">
            {currencyFormat(parseFloat(product?.price?.$numberDecimal))}
          </h4>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex items-center px-4 py-2 space-x-1 text-sm font-medium text-white bg-yellow-400 rounded-lg focus:outline-none hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
          >
            <ShoppingCartIcon className="h-5" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
