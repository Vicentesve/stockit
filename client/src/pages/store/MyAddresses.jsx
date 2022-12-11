import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddressCard from "../../components/Store/AddressCard";
import AddressCardSkeleton from "../../components/Store/AddressCardSkeleton";
import { getMyAddresses, resetAddresses } from "../../redux/storeSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myAddresses = useSelector((state) => state.store.myAddresses);
  const isLoading = useSelector((state) => state.store.isLoading);

  useEffect(() => {
    dispatch(getMyAddresses(user?._id));

    return () => {
      dispatch(resetAddresses());
    };
  }, [dispatch, user?._id]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-screen-xl p-2 mx-auto ">
        <div className="grid grid-cols-1 gap-5 mx-auto w-fit sm:grid-cols-2 lg:grid-cols-3 place-content-around">
          <h3 className="text-3xl font-semibold sm:col-span-2 lg:col-span-3">
            My Addresses
          </h3>

          <Link to="/my-account/my-addresses/new-address">
            <div className="cursor-pointer flex justify-center items-center flex-col w-[320px] h-[260px] border-2 border-gray-300 rounded-md border-dashed text-gray-400">
              <svg
                className="w-24 h-24"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="text-2xl font-semibold">Add Direction</h3>
            </div>
          </Link>

          {isLoading ? (
            <>
              {[...Array(10)].map((_, i) => (
                <AddressCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {myAddresses?.map((address, i) => (
                <AddressCard key={i} address={address} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
