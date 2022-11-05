import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Pagination from "../Pagination";
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
          formState[column.value] = 0;
          break;
        case "image":
          formState[column.value] = "";
          break;
        case "number":
          formState[column.value] = 0;
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
    setFormData(data); // Set the data to the row selected
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) return; // If there is an error, then return.

    formData.price = parseFloat(formData.price);

    if (addModeId) {
      formData.image =
        formData.image === ""
          ? "https://flowbite.com/docs/images/examples/image-1@2x.jpg"
          : formData.image;

      dispatch(onSubmitAdd(formData));
      setAddModeId(false);
      setFormData(buildFormState());
    } else {
      dispatch(onSubmitEdit(formData));
      setEditModeId(null);
      setFormData(buildFormState());
    }
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    dispatch(onSubmitDelete(formData));
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="relative flex flex-col w-full h-full "
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
