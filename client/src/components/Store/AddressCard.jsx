import React from "react";
import { Link } from "react-router-dom";

const AddressCard = ({ address }) => {
  return (
    <div className="cursor-pointer flex flex-col justify-between p-4 w-[320px] h-[260px] border border-gray-300 rounded-md text-sm">
      <div>
        <h3 className="text-base font-semibold">{address?.name}</h3>
        <p>{address?.streetNumber}</p>
        <p className="uppercase ">{address?.suburb}</p>
        <p className="uppercase ">
          {address?.city}, {address?.state}
        </p>
        <p className="uppercase ">{address?.postalCode}</p>
        <p>{address?.country}</p>
        <p>Phone number: {address?.phoneNumber}</p>
      </div>

      <div className="flex space-x-3">
        <Link
          to="/my-account/my-addresses/new-address"
          state={{ address }}
          className="text-blue-400 hover:underline"
        >
          Edit
        </Link>
        <span>|</span>
        <button className="text-blue-400 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default AddressCard;
