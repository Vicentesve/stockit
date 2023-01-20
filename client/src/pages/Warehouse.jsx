import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentPath from "../components/CurrentPath";
import TablePrueba from "../components/Table/TablePrueba";
import TableSkeleton from "../components/TableSkeleton";
import { getCategories } from "../redux/categoriesSlice";
import { setSubSideNav } from "../redux/sidenavSlice";
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

  const buildNavRoute = () => {
    const arrayPath = window.location.pathname.split("/");
    arrayPath.shift();
    let navPath = [];
    let concatRoute = "";
    arrayPath.forEach((data) => {
      const dataPush = {};

      dataPush.route = `${concatRoute}/${data}`;
      dataPush.name = data;
      concatRoute = concatRoute.concat(`/${data}`);
      navPath.push(dataPush);
    });
    navPath[1].onClick = () => dispatch(setSubSideNav(true));

    return navPath;
  };
  const columns = React.useMemo(
    () => [
      { label: "Image", value: "image", type: "image", width: "w-[15%]" },
      {
        label: "Name",
        value: "name",
        type: "text",
        width: "w-[15%]",
        Icon: (
          <svg
            aria-hidden="true"
            className="h-full"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
              fillRule="evenodd"
            ></path>
          </svg>
        ),
      },
      {
        label: "Description",
        value: "description",
        type: "text-area",
        width: "w-[35%]",
        Icon: (
          <svg
            aria-hidden="true"
            className="h-full"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              fillRule="evenodd"
            ></path>
          </svg>
        ),
      },
      {
        label: "Category",
        value: "category",
        type: "select",
        width: "w-[15%]",
        options: categories,
        Icon: (
          <svg
            className="h-full"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
              fillRule="evenodd"
            ></path>
          </svg>
        ),
      },
      {
        label: "Price",
        value: "price",
        type: "price",
        width: "w-[15%]",
        Icon: (
          <svg
            className="h-full"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
            <path
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              fillRule="evenodd"
            ></path>
          </svg>
        ),
      },
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
    <div className="flex flex-col w-full min-h-screen p-3 md:py-5 md:px-10 dark:bg-gray-800">
      <CurrentPath arrayPath={buildNavRoute()} />

      {isLoading ? (
        <TableSkeleton columns={columns} data={dataSkeleton} />
      ) : (
        <TablePrueba
          columns={columns}
          data={warehouse?.products}
          itemsPerPage={20}
          dataSkeleton={dataSkeleton}
          onSubmitAdd={addProduct}
          onSubmitEdit={editProduct}
          onSubmitDelete={deleteProduct}
          isEditable
        />
      )}
    </div>
  );
};

export default Warehouse;
