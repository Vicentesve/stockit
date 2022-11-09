import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
import ProductCardAdd from "../ProductCardAdd";
import ProductCardEdit from "../ProductCardEdit";
import ProductCardRead from "../ProductCardRead";

const TableMobile = ({
  data,
  itemsPerPage,
  options,
  onSubmitEdit,
  onSubmitAdd,
  onSubmitDelete,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    image: [
      {
        product_img_url:
          "https://flowbite.com/docs/images/examples/image-1@2x.jpg",
      },
    ],
    name: "",
    price: "",
    category: "0",
    description: "",
  });

  const [errors, setErrors] = useState({
    image: "",
    name: "",
    price: "",
    category: "0",
    description: "",
  });

  const onChangeImage = (imageList) => {
    setFormData({ ...formData, image: imageList });
  };

  /**
   * * Pagination variables
   */
  const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
  const [recordsPerPage] = useState(itemsPerPage); // No of Records to be displayed on each page
  const indexOfLastRecord = currentPage * recordsPerPage; // First record on the current page.
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // Last record on the current page.
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord); // Records to be displayed on the current page

  /**
   * * FormData variables & addMode and editMode
   */
  const [addModeId, setAddModeId] = useState(false);
  const [editModeId, setEditModeId] = useState(null);
  /**
   * * Function to know which card is en edit mode
   */
  const handleCancelClick = () => {
    setAddModeId(false); // Set the addMode to false
    setEditModeId(null); // Set the editMode to de _id to edit
  };
  /**
   * * Function to know which card is en edit mode
   */
  const handleEditClick = (product) => {
    console.log(product);
    setAddModeId(false); // Set the addMode to false
    setEditModeId(product?._id);
  };
  /**
   * * Function to know which card is on delete mode
   */
  const handleDeleteClick = () => {
    setAddModeId(false);
    setEditModeId(false);
  };

  const handleFormDelete = (formData) => {
    dispatch(onSubmitDelete(formData));
  };

  /**
   * * Function to know which card is on add mode
   */
  const handleAddClick = () => {
    setAddModeId(true);
    setEditModeId(null);
  };

  /**
   * * Function to find the category base on the id
   * @param {*} idCategory
   * @returns
   */
  const findCategory = (idCategory) => {
    const objIndex = options.findIndex((obj) => obj._id === idCategory);
    return options[objIndex]?.name;
  };

  /**
   * * Function to submit data
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    /* console.log(data); */
    /* data.price = data.price.replace("$", "").replaceAll(",", "");
    dispatch(onSubmitAdd(data));
    handleCancelClick(); */
  };

  return (
    <div className="relative">
      <div
        className={`flex ${
          currentRecords?.length > 0 ? "justify-between" : " justify-end"
        }`}
      >
        {/* Pagination */}
        <Pagination
          totalRecords={data?.length}
          pageLimit={recordsPerPage}
          pageNeighbours={1}
          onPageChanged={setCurrentPage}
          currentPage={currentPage}
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <PlusCircleIcon className="h-5" />
        </button>
      </div>

      {addModeId ? (
        <ProductCardAdd
          options={options}
          formData={formData}
          errors={errors}
          onChangeImage={onChangeImage}
          handleCancelClick={handleCancelClick}
          handleAddClick={handleAddClick}
          handleFormSubmit={handleFormSubmit}
        />
      ) : null}

      {currentRecords?.length > 0 ? (
        <>
          {currentRecords?.map((record, i) => (
            <div key={i} className="flex flex-col items-center space-y-5">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[650px] dark:bg-gray-800 dark:border-gray-700 group perspective my-5 ">
                <div
                  className={`relative w-full h-full duration-700 preserve-3d ${
                    editModeId === record?._id ? "my-rotate-y-180" : ""
                  }`}
                >
                  <ProductCardRead
                    product={record}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleFormDelete={handleFormDelete}
                    findCategory={findCategory}
                  />

                  {!addModeId ? (
                    <ProductCardEdit
                      handleCancelClick={handleCancelClick}
                      options={options}
                      product={record}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableMobile;
