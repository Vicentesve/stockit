import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonTitle from "../components/SkeletonTitle";
import Table from "../components/Table/Table";
import { getCategories } from "../redux/categoriesSlice";
import {
  editProduct,
  getMyWarehouse,
  addProduct,
  deleteProduct,
} from "../redux/warehouseSlice";

const Warehouse = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { warehouse, isLoading } = useSelector((state) => state.warehouse);
  const { categories } = useSelector((state) => state.categories);

  const columns = React.useMemo(
    () => [
      { label: "Image", value: "image", type: "image", width: "w-[15%]" },
      { label: "Name", value: "name", type: "text", width: "w-[15%]" },
      {
        label: "Description",
        value: "description",
        type: "text-area",
        width: "w-[35%]",
      },
      {
        label: "Category",
        value: "category",
        type: "select",
        width: "w-[15%]",
        options: categories,
      },
      { label: "Price", value: "price", type: "number", width: "w-[15%]" },
    ],
    [categories]
  );
  const dataSkeleton = [
    {
      image: (
        <svg
          className="w-10 h-10 mr-2 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      name: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      description: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      category: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      price: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getMyWarehouse(user?._id));
    dispatch(getCategories());
  }, [dispatch, user]);

  return (
    <div className="flex flex-col flex-grow w-full p-3 overflow-hidden md:py-5 md:px-10">
      {isLoading ? (
        <SkeletonTitle />
      ) : (
        <h3 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
          {warehouse?.name}
          <p className="text-base font-light text-gray-500 dark:text-gray-400">
            {warehouse?._id}
          </p>
        </h3>
      )}

      <Table
        columns={columns}
        data={warehouse?.products}
        options={categories}
        itemsPerPage={20}
        isLoading={isLoading}
        dataSkeleton={dataSkeleton}
        onSubmitAdd={addProduct}
        onSubmitEdit={editProduct}
        onSubmitDelete={deleteProduct}
      />
    </div>
  );
};

export default Warehouse;
