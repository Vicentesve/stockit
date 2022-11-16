import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import ProductCardAdd from "../ProductCardAdd";
import ProductCardEdit from "../ProductCardEdit";
import ProductCardRead from "../ProductCardRead";
import SkeletonTableMobile from "./SkeletonTableMobile";
import TableSkeleton from "./../TableSkeleton";
import NoData from "../NoData";
import ReadOnlyRow from "./ReadOnlyRow";
import AddRow from "./AddRow";
import EditableRow from "./EditableRow";

const Table = ({
  columns,
  data,
  options,
  itemsPerPage,
  isLoading,
  onSubmitAdd,
  onSubmitEdit,
  onSubmitDelete,
  dataSkeleton,
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
          formState[column.value] =
            "https://flowbite.com/docs/images/examples/image-1@2x.jpg";
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
    });
  };
  const scrollToTopTable = () => {
    divRef.current.scroll({
      top: 0,
      behavior: "smooth",
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
  const handleDeleteClick = () => {
    setAddModeId(false);
    setEditModeId(false);
  };

  /**
   * * Function to enter in add mode
   */
  const handleAddClick = () => {
    setAddModeId(true);
    /* setEditModeId(null); */
    scrollToTopTable();
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
    <div className="flex flex-col flex-grow">
      {windowSize.innerWidth < 640 ? (
        <div className="h-full overflow-hidden">
          {isLoading ? (
            <SkeletonTableMobile />
          ) : (
            <div className="h-full">
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

                          {editModeId === record?._id ? (
                            <ProductCardEdit
                              id={record?._id}
                              data={setFormState(record)}
                              errors={buildFormErrors()}
                              handleCancelClick={handleCancelClick}
                              columns={columns}
                              onSubmitEdit={onSubmitEdit}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <NoData visible={addModeId} />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="h-full overflow-hidden">
          {isLoading ? (
            <TableSkeleton columns={columns} data={dataSkeleton} />
          ) : (
            <div className="h-full">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="flex items-center space-x-2 button"
                  onClick={handleAddClick}
                >
                  <PlusCircleIcon className="h-5" /> <span>Add product</span>
                </button>
              </div>

              {currentRecords?.length > 0 ? (
                <div className="relative border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
                  <div
                    ref={divRef}
                    className="h-[450px] xl:h-[500px] 2xl:h-[650px] overflow-auto rounded-lg scrollbar-thumb-rounded-lg scrollbar-thin scrollbar-thumb-gray-50 dark:scrollbar-thumb-gray-700"
                  >
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          {columns?.map((column, i) => (
                            <th
                              key={i}
                              scope="col"
                              className={`px-6 py-3 ${column.width}`}
                            >
                              {column.label}
                            </th>
                          ))}
                          <th scope="col" className="px-6 py-3 w-[5%]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {addModeId ? (
                          <AddRow
                            columns={columns}
                            addFormData={buildFormState()}
                            errors={buildFormErrors()}
                            handleCancelClick={handleCancelClick}
                            onSubmitAdd={onSubmitAdd}
                          />
                        ) : null}
                        {currentRecords?.map((item, i) => (
                          <Fragment key={i}>
                            {editModeId === item?._id ? (
                              <EditableRow
                                id={item?._id}
                                columns={columns}
                                data={setFormState(item)}
                                errors={buildFormErrors()}
                                handleCancelClick={handleCancelClick}
                                onSubmitEdit={onSubmitEdit}
                              />
                            ) : (
                              <ReadOnlyRow
                                rowIndex={i}
                                rowItem={item}
                                columns={columns}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                                onSubmitDelete={onSubmitDelete}
                              />
                            )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <NoData visible={addModeId} />
              )}
            </div>
          )}
        </div>
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
