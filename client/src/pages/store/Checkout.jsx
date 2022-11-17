import {
  ArchiveBoxIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "../../components/Spinner";
import { setOrder } from "../../redux/orderSlice";
import { removeAllFromCart } from "../../redux/storeSlice";
import Logo from "./../../components/Logo";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.order);

  const { total, cartSize, cart } = useSelector((state) => state.store);

  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  useEffect(() => {
    if (!user || cartSize <= 0) {
      navigate("/");
    }
  }, [user, cartSize, navigate]);

  const onSubmit = () => {
    const orderToSubmit = {};
    orderToSubmit.customerId = user?._id;
    orderToSubmit.fromWarehouseId = [];
    const products = [];

    for (const key in cart) {
      const keys = Object.keys(cart[key]);

      keys.forEach((a, _) => {
        if (a === "fromWarehouseId") {
          orderToSubmit.fromWarehouseId.push(cart[key].fromWarehouseId);
        }
      });
    }
    for (const key in cart) {
      const productToPush = {};
      productToPush._id = cart[key]._id;
      productToPush.name = cart[key].name;
      productToPush.description = cart[key].description;
      productToPush.price = cart[key].price;
      productToPush.category = cart[key].category;
      productToPush.image = cart[key].image;
      productToPush.quantity = cart[key].quantity;

      products.push(productToPush);
    }

    orderToSubmit.products = products;
    orderToSubmit.total = total;

    dispatch(setOrder(orderToSubmit));
    dispatch(removeAllFromCart());
  };

  return (
    <div className="h-screen bg-gray-50">
      {isLoading ? <Spinner /> : null}
      <div className="max-w-screen-xl p-5 mx-auto bg-white">
        <Logo nameInline />

        <h4 className="mt-5 text-2xl font-semibold">Payment Details</h4>
        <p className="my-1 text-sm text-gray-400">
          Complete your purchase by providing payment details
        </p>

        <div className="sm:flex sm:space-x-5">
          <div className="w-full sm:w-[50%] mt-5 space-y-5 ">
            {/* Payment Method */}
            <div className="p-5 overflow-x-scroll border border-gray-300 rounded-md">
              <h4 className="my-3 text-xl font-semibold">Payment Method</h4>
              <ul className="flex space-x-5">
                <li className="w-fit">
                  <input
                    type="radio"
                    id="hosting-small"
                    name="hosting"
                    value="hosting-small"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="hosting-small"
                    className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="p-4 text-white rounded-md w-28 bg-slate-700">
                      <div className="h-4 w-7">
                        <img
                          className="object-cover w-full h-full"
                          src="https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png"
                          alt=""
                        />
                      </div>
                      <p className="select-none ">** 5544</p>
                    </div>
                  </label>
                </li>

                <li className="w-fit">
                  <input
                    type="radio"
                    id="hosting-small2"
                    name="hosting"
                    value="hosting-small2"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="hosting-small2"
                    className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="p-4 text-white bg-blue-700 rounded-md w-28">
                      <div className="h-4 w-7">
                        <img
                          className="object-cover w-full h-full"
                          src="https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png"
                          alt=""
                        />
                      </div>
                      <p className="select-none ">** 4598</p>
                    </div>
                  </label>
                </li>

                <li className="w-fit">
                  <input
                    type="radio"
                    id="hosting-small3"
                    name="hosting"
                    value="hosting-small3"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="hosting-small3"
                    className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="p-4 text-white bg-red-700 rounded-md w-28">
                      <div className="h-4 w-7">
                        <img
                          className="object-cover w-full h-full"
                          src="https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png"
                          alt=""
                        />
                      </div>
                      <p className="select-none ">** 0808</p>
                    </div>
                  </label>
                </li>
              </ul>
            </div>

            {/* Method of Recepit */}
            <div className="px-5 border border-gray-300 rounded-md ">
              <h4 className="my-3 text-xl font-semibold">Method of Recepit</h4>

              <div className="flex justify-between py-3 mt-5 border-b border-gray-300">
                <div className="flex space-x-2">
                  <ArchiveBoxIcon className="h-6" />
                  <div>
                    <h4 className="font-semibold">Courier delivery</h4>
                    <p className="text-sm text-gray-400">
                      3992 Olivo, Florida, Alvaro Obregón, Mexico City.
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="h-7" />
              </div>

              <div className="flex justify-between py-3 border-b border-gray-300">
                <div className="flex space-x-2">
                  <UserIcon className="h-6" />
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <ChevronRightIcon className="h-7" />
              </div>

              <div className="flex justify-between py-3 mb-5 border-b border-gray-300">
                <div className="flex space-x-2">
                  <ChatBubbleBottomCenterTextIcon className="h-6" />
                  <div>
                    <h4 className="font-semibold">Comment to the courier</h4>
                    <p className="text-sm text-gray-400">No comments</p>
                  </div>
                </div>
                <ChevronRightIcon className="h-7" />
              </div>
            </div>
          </div>

          <div className="mt-5 bg-gray-100/50 rounded-md sm:w-[30%] p-5">
            <div className="flex justify-between pb-3 border-b border-gray-300">
              <h3 className="text-xl font-semibold">Total</h3>
              <p className="text-xl font-semibold">{currencyFormat(total)}</p>
            </div>

            <ul className="pb-3 mt-5 space-y-1 font-semibold border-b bordeer-gray-300">
              <li className="flex justify-between">
                <p>Items</p>
                <span>{cartSize}</span>
              </li>
              <li className="flex justify-between">
                <p>Discount</p>
                <span className="text-gray-400">No apply</span>
              </li>
              <li className="flex justify-between">
                <p>Shipping Cost</p>
                <span>Free</span>
              </li>
            </ul>

            <button
              onClick={onSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-5"
            >
              Pay {currencyFormat(total)}
            </button>
            <p className="mt-2 text-xs font-light text-gray-400">
              By clicking the button, you agree to the{" "}
              <span className="underline">
                Terms of Service as well as the Terms of Sale
              </span>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Checkout;
