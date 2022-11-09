import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import ProductCardAdd from "../ProductCardAdd";
import ProductCardEdit from "../ProductCardEdit";
import ProductCardRead from "../ProductCardRead";
import SkeletonTableMobile from "./SkeletonTableMobile";

const Table = ({
  columns,
  data,
  options,
  itemsPerPage,
  isLoading,
  onSubmitAdd,
  onSubmitEdit,
  onSubmitDelete,
}) => {
  /* BuildFormState */
  const buildFormState = () => {
    let formState = {};
    // eslint-disable-next-line array-callback-return
    columns.map((column) => {
      switch (column.type) {
        case "text":
        case "text-area":
          formState[column.value] = "";
          break;
        case "select":
          formState[column.value] = {
            value: "0",
            options: column.options,
          };
          break;
        case "image":
          formState[column.value] = "";
          break;
        case "number":
          formState[column.value] = "";
          break;

        default:
          break;
      }
    });

    return formState;
  };
  /* BuildFormState */
  const setFormState = (data) => {
    let formState = {};
    // eslint-disable-next-line array-callback-return
    columns.map((column) => {
      switch (column.type) {
        case "text":
        case "text-area":
        case "image":
          formState[column.value] = data[column.value];
          break;
        case "select":
          formState[column.value] = {
            value: data[column.value],
            options: column.options,
          };
          break;

        case "number":
          formState[column.value] = data[column.value].$numberDecimal;
          break;

        default:
          break;
      }
    });

    return formState;
  };
  /* BuildFormErrors */
  const buildFormErrors = () => {
    let formErrors = {};
    // eslint-disable-next-line array-callback-return
    columns.map((column) => {
      formErrors[column.value] = "";
    });
    return formErrors;
  };

  /**
   * * Window Size: state, effect & function *
   */
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  /**
   * * Variables for pagination
   */
  const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
  const [recordsPerPage] = useState(itemsPerPage); // No of Records to be displayed on each page
  const indexOfLastRecord = currentPage * recordsPerPage; // First record on the current page.
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // Last record on the current page.
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord); // Records to be displayed on the current page
  const divRef = useRef(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  /**
   * * Variables for add a new record or edit a exist one
   */
  const [addModeId, setAddModeId] = useState(false);
  const [editModeId, setEditModeId] = useState(null);

  /**
   * * Function to enter in edit mode
   */
  const handleEditClick = (data) => {
    setAddModeId(false); // Set the addMode to false
    setEditModeId(data._id); // Set the editMode to de _id to edit
  };

  /**
   * * Function to enter in delete mode
   */
  const handleDeleteClick = (data) => {
    setAddModeId(false);
    setEditModeId(false);
  };

  /**
   * * Function to enter in add mode
   */
  const handleAddClick = () => {
    setAddModeId(true);
    /* setEditModeId(null); */
    /* scrollToTop(); */
  };

  const handleCancelClick = () => {
    setEditModeId(null);
    setAddModeId(false);
  };

  /**
   * * Function to find the category base on the id

   */
  const findCategory = (idCategory) => {
    const objIndex = options.findIndex((obj) => obj._id === idCategory);
    return options[objIndex]?.name;
  };

  return (
    <div className="relative">
      {windowSize.innerWidth < 640 ? (
        <div>
          {isLoading ? (
            <SkeletonTableMobile />
          ) : (
            <>
              <div className="flex justify-end">
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
                  addFormData={buildFormState()}
                  handleAddClick={handleAddClick}
                  errors={buildFormErrors()}
                  handleCancelClick={handleCancelClick}
                  columns={columns}
                  onSubmitAdd={onSubmitAdd}
                />
              ) : null}

              {currentRecords?.length > 0 ? (
                <>
                  {currentRecords?.map((record, i) => (
                    <div
                      ref={divRef}
                      key={i}
                      className="relative flex flex-col items-center space-y-5"
                    >
                      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[650px] dark:bg-gray-800 dark:border-gray-700 group perspective my-5 ">
                        <div
                          className={`relative w-full h-full duration-1000 preserve-3d ${
                            editModeId === record?._id ? "my-rotate-y-180" : ""
                          }`}
                        >
                          <ProductCardRead
                            product={record}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                            findCategory={findCategory}
                            onSubmitDelete={onSubmitDelete}
                          />

                          <ProductCardEdit
                            id={record?._id}
                            data={setFormState(record)}
                            errors={buildFormErrors()}
                            handleCancelClick={handleCancelClick}
                            columns={columns}
                            onSubmitEdit={onSubmitEdit}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Pagination */}
      <Pagination
        totalRecords={data?.length}
        pageLimit={recordsPerPage}
        pageNeighbours={1}
        onPageChanged={setCurrentPage}
        currentPage={currentPage}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Table;
