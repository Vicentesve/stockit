import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import Popup from "reactjs-popup";
import Modal from "../Modal";

const ReadOnlyRow = ({
  rowIndex,
  rowItem,
  columns,
  handleEditClick,
  handleDeleteClick,
  handleFormDelete,
}) => {
  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  const PopupDelete = () => (
    <Popup
      modal
      nested
      trigger={
        <button onClick={() => handleDeleteClick(rowItem)} type="button">
          <TrashIcon className="h-5 text-red-500 cursor-pointer hover:text-red-400" />
        </button>
      }
    >
      {(close) => (
        <Modal
          question="Are you sure you want to delete this product?"
          close={close}
          handleFormDelete={handleFormDelete}
        />
      )}
    </Popup>
  );
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {columns?.map((columnItem) => {
        if (columnItem.value === "image") {
          return (
            <td
              className="flex justify-center w-full h-full px-6 py-4 mx-auto "
              key={`${rowIndex}_${columnItem.value}`}
            >
              <div className="rounded-lg w-[150px] h-20">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={rowItem[columnItem.value]}
                  alt=""
                />
              </div>
            </td>
          );
        }

        if (columnItem?.type === "number") {
          return (
            <td className="px-6 py-4" key={`${rowIndex}_${columnItem?.value}`}>
              {rowItem[columnItem?.value].$numberDecimal}
            </td>
          );
        }

        if (columnItem?.type === "select") {
          const objIndex = columnItem?.options.findIndex(
            (obj) => obj._id === rowItem[columnItem?.value]
          );
          return (
            <td className="px-6 py-4" key={`${rowIndex}_${columnItem?.value}`}>
              {columnItem?.options[objIndex]?.name}
            </td>
          );
        }

        return (
          <td className="px-6 py-4" key={`${rowIndex}_${columnItem?.value}`}>
            {rowItem[columnItem?.value]}
          </td>
        );
      })}

      {/* Action buttons */}
      <td className="px-6 py-4 space-x-2">
        {PopupDelete()}
        <button onClick={() => handleEditClick(rowItem)}>
          <PencilSquareIcon className="h-5 cursor-pointer text-cyan-500 hover:text-cyan-400" />
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
