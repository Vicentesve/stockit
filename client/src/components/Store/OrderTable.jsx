import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import StatusOrder from "./StatusOrder";

const OrderTable = ({
  orderPlacedOn,
  total,
  orderId,
  deliveredOn,
  products,
}) => {
  const orderPlacedOnFormat = new Date(orderPlacedOn);
  const month = orderPlacedOnFormat.toLocaleString("en-US", {
    month: "long",
  });
  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  return (
    <div className="w-full lg:w-[70%] text-sm">
      <div className="items-center p-2 space-y-3 text-gray-500 uppercase border-t border-gray-400 sm:space-y-0 sm:flex sm:justify-between border-x rounded-t-md bg-gray-200/60">
        <div className="flex justify-between space-x-5 sm:justify-start">
          <div>
            <h3>Order placed on</h3>
            <p className="normal-case">
              {month} {orderPlacedOnFormat?.getDate()},{" "}
              {orderPlacedOnFormat.getFullYear()}
            </p>
          </div>
          <div>
            <h4>Total</h4>
            <p>{currencyFormat(parseFloat(total))}</p>
          </div>
        </div>

        <div>
          <h4>Order Nº {orderId}</h4>
          <div className="flex justify-end space-x-2 text-blue-400 normal-case">
            <Link className="hover:underline">See product details</Link>
            <span className="text-gray-500">|</span>
            <Link className="hover:underline">See receipt</Link>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border border-gray-400 rounded-b-md">
        <div>
          {deliveredOn ? (
            <h2 className="text-lg font-semibold">Delivered on 24 Nov. 2022</h2>
          ) : (
            <StatusOrder status={0} />
          )}

          {products?.map((product, i) => (
            <div key={product._id + i} className="flex mt-5 space-x-5">
              <img
                className="h-[90px] w-[90px] object-contain"
                src={product?.image}
                alt=""
              />
              <div>
                <Link className="text-blue-500 hover:underline">
                  {product?.name}
                </Link>
                <span className="block">
                  Eligible for return until Jan 31. 2023
                </span>

                <div className="flex mt-2 space-x-2">
                  <Link
                    to={`/product/${product?._id}`}
                    state={{ product }}
                    className="flex items-center px-2 py-1 space-x-1 text-xs border border-yellow-300 rounded-md whitespace-nowrap h-fit bg-gradient-to-b md:text-sm focus:ring-2 from-yellow-200 to-yellow-400 active:from-yellow-500 focus:ring-yellow-500"
                  >
                    <ArrowPathIcon className="h-4" />
                    <span>Buy again</span>
                  </Link>
                  <button className="flex items-center px-2 py-1 space-x-1 text-xs border border-gray-400 rounded-md whitespace-nowrap h-fit hover:bg-gray-100 md:text-sm focus:ring-2">
                    See your product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
