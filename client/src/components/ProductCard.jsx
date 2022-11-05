import React from "react";
import ProductCardEdit from "./ProductCardEdit";
import ProductCardRead from "./ProductCardRead";

const ProductCard = ({
  product,
  editModeId,
  findCategory,
  handleEditClick,
  options,
  handleCancelClick,
  onSubmitEdit,
  handleDeleteClick,
  handleFormDelete,
}) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[650px] dark:bg-gray-800 dark:border-gray-700 group perspective my-5 ">
      <div
        className={`relative w-full h-full duration-700 preserve-3d  
        ${editModeId === product?._id ? "my-rotate-y-180" : ""}`}
      >
        <ProductCardRead
          product={product}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleFormDelete={handleFormDelete}
          findCategory={findCategory}
        />

        <ProductCardEdit
          data={product}
          handleCancelClick={handleCancelClick}
          options={options}
          onSubmitEdit={onSubmitEdit}
        />
      </div>
    </div>
  );
};

export default ProductCard;
