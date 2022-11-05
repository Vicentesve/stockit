import React from "react";
import Popup from "reactjs-popup";
import Modal from "./Modal";

const currencyFormat = (num) => {
  if (!isNaN(num)) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
    return num;
  }
};

const ProductCardRead = ({
  product,
  handleEditClick,
  handleDeleteClick,
  handleFormDelete,
}) => {
  const PopupDelete = () => (
    <Popup
      modal
      nested
      trigger={
        <button
          onClick={() => handleDeleteClick(product)}
          type="button"
          className="w-[80px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      }
    >
      {(close) => (
        <Modal
          question="Are you sure you want to delete this product?"
          close={close}
          handleFormDelete={() => handleFormDelete(product)}
        />
      )}
    </Popup>
  );

  return (
    <div className="absolute w-full h-full overflow-y-scroll backface-hidden">
      <img
        className="p-8 rounded-t-lg h-[350px] mx-auto"
        src={product?.image}
        alt=""
      />

      <div className="px-5 pb-5">
        <div className="flex space-x-1">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product?.name}
          </h5>
        </div>
        <p className="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
          {product?.category}
        </p>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {currencyFormat(product?.price)}
        </span>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 line-clamp-4">
          {product?.description}
        </p>
      </div>

      <div className="flex justify-end px-5 space-x-5">
        {PopupDelete()}
        <button
          type="button"
          onClick={() => handleEditClick(product?._id)}
          className="w-[80px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductCardRead;
