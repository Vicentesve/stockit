import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addManyToCart,
  addOneToCart,
  dicrementByAmount,
  incrementByAmount,
  removeOneToCart,
  removeProductFromCart,
} from "../../redux/storeSlice";

const CheckOutProduct = ({ id, image, name, description, quantity, price }) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef(null);

  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);

  /**
   * * Window Size: state, effect & function *
   */
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <div>
      {windowSize.innerWidth > 640 ? (
        <div className="flex justify-between p-2 border-t border-gray-300">
          <div className="flex space-x-5">
            <img className="object-contain w-56 h-56 " src={image} alt="" />

            <div>
              <h3 className="text-2xl font-semibold">{name}</h3>
              <p className="text-sm font-light text-gray-500">{description}</p>

              <div className="flex items-center mt-5 space-x-5">
                <div ref={dropdown}>
                  <div
                    onClick={() => setShowDropdown((b) => !b)}
                    className={`rounded-md w-28 cursor-pointer relative hover:bg-gray-200 focus:bg-gray-200 
                  ${showDropdown ? "hover:bg-transparent" : "bg-gray-100"}`}
                  >
                    <div
                      className={`items-center space-x-1 px-2 py-1 overflow-hidden ${
                        showDropdown ? "hidden" : "flex"
                      }`}
                    >
                      <p className="text-sm">Quantity:</p>
                      <p className="text-sm">{quantity}</p>
                      <ChevronDownIcon className="h-3 mt-[2px]" />
                    </div>

                    <div
                      className={`absolute overflow-hidden -top-[280px]  shadow-2xl border border-gray-300 bg-white w-28 rounded-md  ${
                        showDropdown ? "z-20" : "hidden"
                      }`}
                    >
                      <fieldset id={id}>
                        {[...Array(11)].map((_, i) => {
                          return i === quantity ? (
                            <button
                              key={i}
                              value={i}
                              className="w-full hover:bg-[#F0F2F2] px-2 py-1 text-sm font-semibold text-left border border-gray-200 shadow-md quantity bg-gray-50"
                            >
                              {i}
                            </button>
                          ) : (
                            <button
                              key={i}
                              className="hover:bg-[#F0F2F2] px-2 py-1 text-sm w-full text-left"
                              onClick={() => {
                                dispatch(dicrementByAmount(quantity));
                                dispatch(incrementByAmount(i));
                                dispatch(addManyToCart({ id, quantity: i }));
                              }}
                            >
                              {i === 0 ? i + " (Remove)" : i}
                            </button>
                          );
                        })}
                      </fieldset>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeProductFromCart(id))}
                  className="py-[1px] text-blue-500 hover:underline px-3 text-xs border-gray-300 border-x"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3>{currencyFormat(parseFloat(price))}</h3>
          </div>
        </div>
      ) : (
        <div className="border-b border-gray-200 ">
          <div className="flex items-center space-x-10">
            <img
              className="h-[100px] w-[100px] object-contain"
              src={image}
              alt=""
            />

            <div>
              <h3>{name}</h3>
              <p className="text-sm font-semibold">
                {currencyFormat(parseFloat(price))}
              </p>

              <p className="mt-2 text-xs text-green-400">Available</p>
              <p className="text-xs italic font-light">
                Sold and shipped by Stockit
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-10">
            <div className="flex items-center justify-between h-6 mt-5 mb-5 border border-black w-28">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    dispatch(removeOneToCart(id));
                  } else {
                    dispatch(removeProductFromCart(id));
                  }
                }}
                className="w-[30%] justify-center flex items-center h-full p-1 font-semibold bg-gray-200 border-r border-black"
              >
                {quantity > 1 ? (
                  <span>-</span>
                ) : (
                  <TrashIcon className="h-full " />
                )}
              </button>
              <span className="p-1">{quantity}</span>
              <button
                onClick={() => dispatch(addOneToCart(id))}
                className="w-[30%] justify-center flex items-center h-full p-1 font-semibold bg-gray-200 border-l border-black"
              >
                <span>+</span>
              </button>
            </div>

            <button
              onClick={() => dispatch(removeProductFromCart(id))}
              className="px-3 py-1 text-xs bg-gray-100 border border-black rounded-md shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutProduct;
