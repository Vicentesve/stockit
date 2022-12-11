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

const CheckOutProduct = ({
  id,
  image,
  name,
  description,
  quantity,
  price,
  number,
}) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(parseInt(quantity));
  useEffect(() => {
    if (quantity > 10) {
      setQty(quantity);
      setCustomQty(true);
    } else {
      setCustomQty(false);
    }
  }, [quantity]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customQty, setCustomQty] = useState(
    parseInt(quantity) >= 10 ? true : false
  );
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
  }, [showDropdown, quantity]);

  const updateCustomQty = () => {
    dispatch(dicrementByAmount(quantity));
    dispatch(incrementByAmount(parseInt(qty)));
    dispatch(addManyToCart({ id, quantity: qty }));

    if (parseInt(qty) <= 10) setCustomQty(false);
  };
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
            <img className="object-contain w-56 h-56" src={image} alt="" />

            <div>
              <h3 className="text-2xl font-semibold">{name}</h3>
              <p className="text-sm font-light text-gray-500">{description}</p>

              <div className="flex items-center mt-5 space-x-5">
                {/* New Select */}
                {!customQty ? (
                  <div ref={dropdown} className={`relative text-sm`}>
                    <div
                      onClick={() => {
                        setShowDropdown((b) => !b);
                      }}
                      className={`flex space-x-1 items-center px-2 py-1 border bg-gray-100 hover:bg-gray-200 border-gray-200 rounded-md w-[120px] max-w-[120px] cursor-pointer ${
                        showDropdown && "invisible"
                      }`}
                    >
                      <p> Quantity: {quantity}</p>
                      <ChevronDownIcon className="h-4 mt-[2px]" />
                    </div>

                    <div
                      onClick={() => {
                        setShowDropdown((b) => !b);
                      }}
                      className={`${
                        number <= 1 ? "top-0" : "bottom-0"
                      }  absolute border bg-white z-[20] border-gray-300 rounded-md shadow-md w-[120px] max-w-[120px] cursor-pointer ${
                        !showDropdown && "invisible"
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
                                if (i === 0) {
                                  dispatch(removeProductFromCart(id));
                                } else if (i === 10) {
                                  setCustomQty(true);
                                } else {
                                  dispatch(dicrementByAmount(quantity));
                                  dispatch(incrementByAmount(i));
                                  dispatch(addManyToCart({ id, quantity: i }));
                                }
                              }}
                            >
                              {i === 0
                                ? i + " (Remove)"
                                : i === 10
                                ? i + "+"
                                : i}
                            </button>
                          );
                        })}
                      </fieldset>
                    </div>
                  </div>
                ) : null}

                {customQty ? (
                  <div
                    className={`items-center space-x-2 ${
                      customQty ? "flex" : "hidden"
                    }`}
                  >
                    <fieldset id={id}>
                      <input
                        id={id}
                        name={id}
                        type="text"
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                        className="w-[120px] border text-sm border-black rounded-md px-2 py-1"
                      />
                    </fieldset>
                    <button
                      type="button"
                      onClick={updateCustomQty}
                      className="p-1 text-xs border border-yellow-300 rounded-md bg-gradient-to-b focus:ring-2 from-yellow-200 to-yellow-400 active:from-yellow-500 focus:ring-yellow-500 "
                    >
                      Update
                    </button>
                  </div>
                ) : null}

                <button
                  onClick={() => {
                    dispatch(removeProductFromCart(id));
                  }}
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
