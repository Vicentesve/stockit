import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "../Popup";
import Dropdown from "../Dropdown";
import ToolTip from "../ToolTip";

const PencilSquareIcon = () => {
  return (
    <svg
      className="h-5 cursor-pointer text-cyan-500 hover:text-cyan-400"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const TrashIcon = () => {
  return (
    <svg
      className="h-5 text-red-500 cursor-pointer hover:text-red-400"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const ReadOnlyRow = ({
  rowIndex,
  rowItem,
  columns,
  handleEditClick,
  handleDeleteClick,
  onSubmitDelete,
  isEditable,
}) => {
  const [popUpState, setPopUpState] = useState(false);

  const dispatch = useDispatch();

  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  const handleFormDelete = () => {
    dispatch(onSubmitDelete(rowItem));
  };

  const togglePopup = () => {
    setPopUpState(!popUpState);
  };

  const handleStatus = (columnItem, status, options, handleSubmit) => {
    return (
      <div>
        <Dropdown
          id={rowItem["_id"]}
          placeHolder="Select..."
          options={options}
          value={status}
          handleSubmit={handleSubmit}
          hasPop
        />
      </div>
    );
  };

  const PopupDelete = () => (
    <div className="inline-block">
      <ToolTip
        tooltip="Delete"
        content={
          <button
            onClick={() => {
              handleDeleteClick(rowItem);
              togglePopup();
            }}
            type="button"
          >
            <TrashIcon />
          </button>
        }
      />
      {popUpState && (
        <Popup
          handleClose={togglePopup}
          question="Are you sure you want to delete this product?"
          handleFormFunction={handleFormDelete}
        />
      )}
    </div>
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = React.useRef(null);

  function handleMouseEnter() {
    setShowTooltip(true);
  }

  function handleMouseLeave() {
    setShowTooltip(false);
  }

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  const renderColumns = (columnItem) => {
    switch (columnItem.type) {
      case "text":
      case "date":
        return (
          <td
            className={`px-6 py-4 ${columnItem.isHidden ? "hidden" : ""}`}
            key={`${rowIndex}_${columnItem?.value}`}
          >
            {rowItem[columnItem?.value]}
          </td>
        );

      case "number":
        return (
          <td
            className={`px-6 py-4 ${columnItem.isHidden ? "hidden" : ""}`}
            key={`${rowIndex}_${columnItem?.value}`}
          >
            {rowItem[columnItem?.value]}
          </td>
        );

      case "image":
        return (
          <td
            className={`overflow-visible flex justify-center w-full h-full px-6 py-4 mx-auto  ${
              columnItem.isHidden ? "hidden" : ""
            }`}
            key={`${rowIndex}_${columnItem.value}`}
          >
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className=" w-[150px] rounded-lg h-20  overflow-visible"
            >
              <img
                className="object-cover w-full h-full rounded-lg "
                src={rowItem[columnItem.value]}
                alt=""
              />
              {showTooltip && !columnItem.isHidden ? (
                <img
                  className="border border-gray-200 shadow-md translate-y-[-50%] p-3 rounded-md bg-white dark:bg-gray-800 absolute object-cover w-[200px] h-fit z-[9999] overflow-visible"
                  src={rowItem[columnItem.value]}
                  alt=""
                  ref={tooltipRef}
                  style={{
                    position: "fixed",
                    left: coords.x + 20,
                    top: coords.y,
                  }}
                />
              ) : null}
            </div>
          </td>
        );

      case "text-area":
        return (
          <td
            className={`px-6 py-4 ${columnItem.isHidden ? "hidden" : ""}`}
            key={`${rowIndex}_${columnItem?.value}`}
          >
            <p className=" line-clamp-4">{rowItem[columnItem?.value]}</p>
          </td>
        );

      case "select":
        const objIndex = columnItem?.options.findIndex(
          (obj) => obj._id === rowItem[columnItem?.value]
        );
        return (
          <td
            className={`px-6 py-4 ${columnItem.isHidden ? "hidden" : ""}`}
            key={`${rowIndex}_${columnItem?.value}`}
          >
            {columnItem?.options[objIndex]?.label}
          </td>
        );

      case "price":
        return (
          <td
            className={`px-6 py-4 ${columnItem.isHidden ? "hidden" : ""}`}
            key={`${rowIndex}_${columnItem?.value}`}
          >
            {currencyFormat(parseFloat(rowItem[columnItem?.value]))}
          </td>
        );

      case "status":
        const objIndexStatus = columnItem?.options?.findIndex(
          (obj) => obj._id === rowItem[columnItem?.value]
        );

        return (
          <td
            className={`px-6 py-4 ${columnItem.isHidden ? "hidden" : ""}`}
            key={`${rowIndex}_${columnItem?._id}`}
          >
            {handleStatus(
              columnItem,
              {
                value: rowItem[columnItem?.value],
                label: columnItem?.options[objIndexStatus]?.label,
                style: columnItem?.options[objIndexStatus]?.style,
              },
              columnItem?.options,
              columnItem?.handleSubmit
            )}
          </td>
        );

      default:
        return (
          <td className="px-6 py-4" key={`${rowIndex}_${columnItem?.value}`}>
            No match
          </td>
        );
    }
  };

  return (
    <tr className="h-full bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {columns?.map((columnItem) => renderColumns(columnItem))}

      {/* Action buttons */}
      {isEditable ? (
        <td className="px-6 py-4 space-x-2">
          {PopupDelete()}
          <ToolTip
            tooltip="Edit"
            content={
              <button onClick={() => handleEditClick(rowItem)}>
                <PencilSquareIcon />
              </button>
            }
          />
        </td>
      ) : null}
    </tr>
  );
};

export default ReadOnlyRow;
