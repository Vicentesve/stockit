import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
import ProductCard from "../ProductCard";
import ProductCardAdd from "../ProductCardAdd";

const TableMobile = ({
  data,
  itemsPerPage,
  options,
  onSubmitEdit,
  onSubmitAdd,
  onSubmitDelete,
}) => {
  const dispatch = useDispatch();

  /**
   * * Pagination variables
   */
  const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
  const [recordsPerPage] = useState(itemsPerPage); // No of Records to be displayed on each page
  const indexOfLastRecord = currentPage * recordsPerPage; // First record on the current page.
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // Last record on the current page.
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord); // Records to be displayed on the current page

  /**
   * * Scroll to top variables
   */
  const divRef = useRef(null);
  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

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
  const handleEditClick = (id) => {
    setAddModeId(false); // Set the addMode to false
    setEditModeId(id); // Set the editMode to de _id to edit
  };
  /**
   * * Function to know which card is on delete mode
   */
  const handleDeleteClick = (data) => {
    setAddModeId(false);
    setEditModeId(false);
  };

  const handleFormDelete = (formData) => {
    console.log(formData);
    dispatch(onSubmitDelete(formData));
  };

  /**
   * * Function to know which card is on add mode
   */
  const handleAddClick = () => {
    setAddModeId(true);
    setEditModeId(null);
    scrollToTop();
  };

  const findCategory = (idCategory) => {
    const objIndex = options.findIndex((obj) => obj._id === idCategory);
    return options[objIndex]?.name;
  };

  return (
    <div className="relative">
      <div ref={divRef} className="sticky top-0 flex justify-between">
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
          handleCancelClick={handleCancelClick}
          onSubmitAdd={onSubmitAdd}
        />
      ) : null}

      {currentRecords?.map((record, i) => (
        <div key={i} className="flex flex-col items-center space-y-5">
          <ProductCard
            product={record}
            editModeId={editModeId}
            findCategory={findCategory}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            options={options}
            onSubmitEdit={onSubmitEdit}
            handleDeleteClick={handleDeleteClick}
            handleFormDelete={handleFormDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TableMobile;
