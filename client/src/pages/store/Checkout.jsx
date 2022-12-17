import {
  ArchiveBoxIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "../../components/Spinner";
import Accordion from "../../components/Store/Accordion";
import { setOrder } from "../../redux/orderSlice";
import {
  getMyAddresses,
  getMyPayments,
  removeAllFromCart,
  resetAddresses,
} from "../../redux/storeSlice";
import Logo from "./../../components/Logo";
import CreditCardPreview from "../../components/Store/CreditCardPreview";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.order);
  const myPayments = useSelector((state) => state.store.myPayments);

  const {
    total,
    cartSize,
    cart,
    myAddresses,
    isLoading: isLoadingStore,
  } = useSelector((state) => state.store);

  useEffect(() => {
    if (!user || cartSize <= 0) {
      navigate("/");
    }

    dispatch(getMyAddresses(user?._id));
    dispatch(getMyPayments(user?._id));

    return () => {
      dispatch(resetAddresses());
    };
  }, [dispatch, user, cartSize, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const orderToSubmit = {};
    orderToSubmit.customerId = user?._id;
    orderToSubmit.products = [...cart];
    orderToSubmit.total = total;
    orderToSubmit.address = `${selectedAddress?.streetNumber}, ${selectedAddress?.suburb}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.postalCode}, ${selectedAddress?.country}, Phone number: ${selectedAddress?.phoneNumber}`;
    const payment = {
      number: selectedPayment?.number,
      name: selectedPayment?.name,
      facturarion: orderToSubmit.address,
      expiry: selectedPayment?.expiry,
    };
    orderToSubmit.payment = payment;
    console.log(orderToSubmit);

    dispatch(setOrder(orderToSubmit));
    dispatch(removeAllFromCart());
  };

  const [selectedAddress, setSelectedAddres] = useState(myAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(myPayments[0]);

  const [comments, setComments] = useState("");

  useEffect(() => {
    setSelectedAddres(myAddresses[0]);
    setSelectedPayment(myPayments[0]);
  }, [myAddresses, myPayments]);

  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  const handleChangeAddress = (e) => {
    setSelectedAddres(myAddresses[e.target.value]);
  };

  const handleChangePayment = (e) => {
    setSelectedPayment(myPayments[e.target.value]);
  };

  const optionsAddresses = () => {
    return (
      <ul className="px-3 py-2 space-y-3 text-sm">
        {myAddresses.map((address, i) => (
          <li className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              defaultChecked={address.isDefault ? true : false}
              id={address?._id}
              type="radio"
              name="selectedAddress"
              value={i}
              onChange={handleChangeAddress}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={address?._id}
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <strong>{address.name}</strong> {address?.streetNumber},{" "}
              {address?.suburb}, {address?.city}, {address?.state},{" "}
              {address?.postalCode}, {address?.country}, Phone number:{" "}
              {address?.phoneNumber}
            </label>
          </li>
        ))}
      </ul>
    );
  };

  const contentComents = () => {
    return (
      <textarea
        id="comments"
        name="comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Put your comments here..."
        className="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></textarea>
    );
  };

  return (
    <div className="h-screen bg-gray-50">
      {isLoading ? <Spinner /> : null}
      <div className="max-w-screen-xl p-5 mx-auto bg-white">
        <Link to="/">
          <Logo nameInline />
        </Link>

        <h4 className="mt-5 text-2xl font-semibold">Payment Details</h4>
        <p className="my-1 text-sm text-gray-400">
          Complete your purchase by providing payment details
        </p>

        <form onSubmit={onSubmit} className="sm:flex sm:space-x-5">
          <div className="w-full sm:w-[50%] mt-5 space-y-5 ">
            {/* Payment Method */}
            <div className="p-5 overflow-x-scroll border border-gray-300 rounded-md">
              <h4 className="my-3 text-xl font-semibold">Payment Method</h4>
              <ul className="flex space-x-5">
                {myPayments?.map((payment, i) => (
                  <li key={i}>
                    <input
                      type="radio"
                      id={payment._id}
                      name="payment"
                      value={i}
                      onChange={handleChangePayment}
                      defaultChecked={payment.isDefault ? true : false}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={payment._id}
                      className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <CreditCardPreview
                        type={payment?.issuer}
                        number={payment?.number}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Method of Recepit */}
            <div className="px-5 py-5 border border-gray-300 rounded-md ">
              <h4 className="my-3 text-xl font-semibold">Method of Recepit</h4>

              {/* Accordion for addresses */}
              <Accordion
                isLoading={isLoadingStore}
                Icon={ArchiveBoxIcon}
                condition={myAddresses.length > 0}
                selectedTitle="Courier delivery"
                selectedContent={`${selectedAddress?.streetNumber},
                ${selectedAddress?.suburb},
                ${selectedAddress?.state}, ${selectedAddress?.city}.`}
                noContentTitle="No addresses registered."
                legentToNoContent="Register a new one."
                link="/my-account/my-addresses/new-address"
                options={optionsAddresses()}
              />

              <Accordion
                isLoading={isLoadingStore}
                Icon={UserIcon}
                selectedTitle={user?.fullname}
                selectedContent={user?.email}
              />

              <Accordion
                isLoading={isLoadingStore}
                Icon={ChatBubbleBottomCenterTextIcon}
                condition
                selectedTitle="Comment to the courier"
                selectedContent={comments === "" ? "No comment" : comments}
                options={contentComents()}
              />
            </div>
          </div>

          <div className="mt-5 bg-gray-100/50 rounded-md sm:w-[30%] p-5 h-[300px] max-h-[300px]">
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
              type="submit"
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
        </form>
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
