import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
import ProductCardAdd from "../ProductCardAdd";
import ProductCardEdit from "../ProductCardEdit";
import ProductCardRead from "../ProductCardRead";
import AddRow from "./AddRow";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

const Table = ({
  columns,
  data,
  itemsPerPage,
  onSubmitAdd,
  onSubmitEdit,
  onSubmitDelete,
  options,
}) => {
  /* Window Size: state, effect & function */
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
          formState[column.value] = 0;
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

  /* BuildFormErrors */
  const buildFormErrors = () => {
    let formErrors = {};
    // eslint-disable-next-line array-callback-return
    columns.map((column) => {
      formErrors[column.value] = "";
    });
    return formErrors;
  };

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // User is currently on this page
  const [recordsPerPage] = useState(itemsPerPage); // No of Records to be displayed on each page
  const indexOfLastRecord = currentPage * recordsPerPage; // First record on the current page.
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // Last record on the current page.
  const currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord); // Records to be displayed on the current page
  const divRef = useRef(null);
  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const [formData, setFormData] = useState(buildFormState());
  const [formErrors, setFormErrors] = useState(buildFormErrors());
  const [addModeId, setAddModeId] = useState(false);
  const [editModeId, setEditModeId] = useState(null);

  const handleEditClick = (data) => {
    const newData = { ...data };
    newData["price"] = data.price.$numberDecimal;
    console.log(newData);

    setFormData(newData); // Set the data to the row selected
    setAddModeId(false); // Set the addMode to false
    setEditModeId(data._id); // Set the editMode to de _id to edit
  };

  const handleDeleteClick = (data) => {
    setFormData(data);
    setAddModeId(false);
    setEditModeId(false);
  };

  const handleAddClick = () => {
    setAddModeId(true);
    setEditModeId(null);
    scrollToTop();
  };

  const handleFormChange = (e) => {
    e.preventDefault();

    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;

    setFormData(newFormData);
  };

  const handleCancelClick = () => {
    setEditModeId(null);
    setAddModeId(false);
    setFormData(buildFormState());
    setFormErrors(buildFormErrors());
  };

  const handleValidation = () => {
    let errors = {};
    let isError = false;
    // eslint-disable-next-line array-callback-return
    columns.map((column) => {
      if (formData[column.value] === "" && column.value !== "image") {
        errors[column.value] = `Please, enter the ${column.value}`;
        isError = true;
      }

      switch (column.type) {
        case "text":
          break;
        case "number":
          if (formData[column.value] === 0) {
            errors[column.value] = `Please, enter a valid number`;
            isError = true;
          }
          break;
        case "select":
          if (formData[column.value] === 0) {
            errors[column.value] = `Please, select a ${column.value}`;
            isError = true;
          }
          break;
        default:
          break;
      }
    });

    setFormErrors(errors);

    return isError;
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    dispatch(onSubmitDelete(formData));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) return; // If there is an error, then return.
    console.log(formData);
    if (formData.price.$numberDecimal)
      formData.price = formData.price.$numberDecimal
        .replace("$", "")
        .replaceAll(",", "");
    else formData.price = formData.price.replace("$", "").replaceAll(",", "");

    if (addModeId) {
      console.log(formData);

      dispatch(onSubmitAdd(formData));
      setAddModeId(false);
      setFormData(buildFormState());
    } else {
      dispatch(onSubmitEdit(formData));
      setEditModeId(null);
      setFormData(buildFormState());
    }
  };

  /**
   * * Function to find the category base on the id

   */
  const findCategory = (idCategory) => {
    const objIndex = options.findIndex((obj) => obj._id === idCategory);
    return options[objIndex]?.name;
  };

  return (
    <>
      <h2>Width: {windowSize.innerWidth}</h2>
      {window.innerWidth >= 640 ? (
        <form
          onSubmit={handleFormSubmit}
          className="relative flex flex-col w-full h-full"
        >
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="flex items-center space-x-2 button"
              onClick={handleAddClick}
            >
              <PlusCircleIcon className="h-5" /> <span>Add product</span>
            </button>
          </div>
          <div
            ref={divRef}
            className="relative overflow-x-auto border border-gray-200 rounded-lg shadow-md sm:rounded-lg dark:border-gray-700"
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
                  <th scope="col" className={`px-6 py-3 w-[5%]`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {addModeId && (
                  <AddRow
                    columns={columns}
                    addFormData={formData}
                    handleFormChange={handleFormChange}
                    handleCancelClick={handleCancelClick}
                    setFormData={setFormData}
                    errors={formErrors}
                  />
                )}
                {currentRecords?.map((item, i) => (
                  <Fragment key={i}>
                    {editModeId === item._id ? (
                      <EditableRow
                        editFormData={formData}
                        handleCancelClick={handleCancelClick}
                        columns={columns}
                        setEditFormData={setFormData}
                        handleFormChange={handleFormChange}
                        errors={formErrors}
                      />
                    ) : (
                      <ReadOnlyRow
                        rowIndex={i}
                        rowItem={item}
                        columns={columns}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                        handleFormDelete={handleFormDelete}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
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
              options={options}
              addFormData={formData}
              handleFormChange={handleFormChange}
              setFormData={setFormData}
              errors={formErrors}
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
                      className={`relative w-full h-full duration-1000 preserve-3d ${
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

                      <ProductCardEdit
                        editFormData={formData}
                        handleFormChange={handleFormChange}
                        errors={formErrors}
                        setFormData={setFormData}
                        handleCancelClick={handleCancelClick}
                        options={options}
                        product={record}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </form>
      )}
      {/* Pagination */}
      <Pagination
        totalRecords={data?.length}
        pageLimit={recordsPerPage}
        pageNeighbours={2}
        onPageChanged={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Table;
