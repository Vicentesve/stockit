import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import NoData from "../NoData";
import ReadOnlyRow from "./ReadOnlyRow";
import AddRow from "./AddRow";
import EditableRow from "./EditableRow";
import { CSVLink } from "react-csv";

const ArrowUpTrayIcon = () => {
  return (
    <svg
      className="h-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const SelectorIcon = () => {
  return (
    <svg
      className="h-3.5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const ArrowUpIcon = () => {
  return (
    <svg
      className="h-3.5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const ArrowDownIcon = () => {
  return (
    <svg
      className="h-3.5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const EyeOffIcon = () => {
  return (
    <svg
      className="h-3.5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
        fillRule="evenodd"
      ></path>
      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
    </svg>
  );
};

const EyeIcon = () => {
  return (
    <svg
      className="h-3.5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
      <path
        clipRule="evenodd"
        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const PlusSmIcon = () => {
  return (
    <svg
      className="h-3.5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

const ChevronDownIcon = ({ className }) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

const SortBy = ({ sortAvailable, column, sortRecords, hideColumn }) => {
  const [showFilter, setShowFilter] = useState(false);
  const inputRef = useRef();
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleChangeSort = (e) => {
    const { value } = e.currentTarget;
    sortRecords(value, column);
    setShowFilter(false);
  };
  const handleHideColumn = () => {
    hideColumn(column);
  };
  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <div ref={inputRef} className="relative">
      <button
        onClick={handleShowFilter}
        className="flex items-center px-2 py-1 space-x-1 uppercase rounded-md hover:bg-gray-200/60 dark:hover:bg-gray-800/60 hover:shadow-sm w-fit"
      >
        <span>{column.label}</span>
        <SelectorIcon />
      </button>
      {showFilter && (
        <div className="absolute p-2 space-y-2 overflow-visible text-gray-700 z-[999] border border-gray-300 dark:border-gray-700 rounded-md shadow-md whitespace-nowrap top-6 dark:shadow-xl bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
          <div className="space-y-1">
            {sortAvailable ? (
              <>
                <button
                  value="asc"
                  onClick={handleChangeSort}
                  className="flex items-center w-full p-1 space-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <ArrowUpIcon /> <span>Sort Ascending</span>
                </button>

                <button
                  value="desc"
                  onClick={handleChangeSort}
                  className="flex items-center w-full p-1 space-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <ArrowDownIcon /> <span>Sort Descending</span>
                </button>

                <div className="w-full dark:bg-gray-800 h-[1px] bg-gray-200" />
              </>
            ) : null}

            <button
              value="hide"
              onClick={handleHideColumn}
              className="flex items-center w-full p-1 space-x-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <EyeOffIcon /> <span>Hide Column</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const HiddenColumns = ({ columns, showColumnFunction }) => {
  const count = columns.filter((value) => value.isHidden).length;
  const [showFilter, setShowFilter] = useState(false);
  const inputRef = useRef();
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleShowColumn = (column) => {
    showColumnFunction(column);
  };
  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <div ref={inputRef} className="relative">
      <button
        onClick={handleShowFilter}
        className="flex items-center px-2 py-1 space-x-1 text-sm button"
      >
        <span>Hidden Columns</span>
        <span className="inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] mt-[2px] font-semibold text-blue-800 bg-blue-200 rounded-full">
          {count}
        </span>
      </button>

      {showFilter && (
        <div className="absolute p-2 overflow-visible text-gray-700 z-[999] border border-gray-300 dark:border-gray-700 rounded-md shadow-md whitespace-nowrap top-8 dark:shadow-xl bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
          {columns
            .filter((item) => item.isHidden)
            .map((item, i) => (
              <button
                key={i}
                onClick={() => handleShowColumn(item)}
                className="flex items-center w-full p-1 space-x-1 text-xs rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <div className="mt-[2px]">
                  <EyeIcon />
                </div>
                <span>
                  Show{" "}
                  <span className="font-semibold">{item.label} Column</span>
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

const AddFilter = ({ columns, addFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const inputRef = useRef();
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const selectedFilterCols = (column, i) => {
    switch (column.type) {
      case "text":
      case "status":
      case "price":
      case "number":
      case "select":
      case "text-area":
      case "date":
        return (
          <div key={i} className="flex items-center p-1">
            <input
              id={column.value}
              name={column.value}
              type="checkbox"
              value={column.activeFilter ? true : false}
              checked={column.activeFilter ? true : false}
              onChange={() => handleOnChange(column)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-1 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor={column.value}
              className="flex w-full ml-2 space-x-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="h-5">{column.Icon}</div>
              <span>{column.label}</span>
            </label>
          </div>
        );

      default:
        break;
    }
  };
  const handleOnChange = (column) => {
    const newCol = [...columns];
    const objIndex = columns.findIndex((obj) => obj.value === column.value);
    newCol[objIndex].activeFilter = !newCol[objIndex].activeFilter;

    addFilter(column.value);
  };
  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <div ref={inputRef} className="relative">
      <button
        onClick={handleShowFilter}
        className="flex items-center px-2 py-1 text-sm button-2"
      >
        <div className="mt-[2px]">
          <PlusSmIcon />
        </div>
        <span>Add Filter</span>
      </button>

      {showFilter && (
        <div
          className="absolute p-2 overflow-visible text-gray-700 z-[999] border border-gray-300 dark:border-gray-700 rounded-md 
        shadow-md whitespace-nowrap top-8 dark:shadow-xl bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
        >
          <h3 className="pr-10 mb-2 font-semibold">Choose a column</h3>

          {columns?.map((col, i) => selectedFilterCols(col, i))}
        </div>
      )}
    </div>
  );
};

const InputField = ({ type, id, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="block w-full p-[6px] text-sm text-gray-900  border border-gray-300 rounded-lg bg-gray-50 
        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
    />
  );
};

const InputFieldNumber = ({
  type,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
      className="block w-full p-[6px] text-sm text-gray-900  border border-gray-300 rounded-lg bg-gray-50 
        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
    />
  );
};

const Select = ({ value, onChange, label, options, isMulti }) => {
  const [showSelect, setShowSelect] = useState(false);
  const inputRef = useRef();
  const handleShowOptions = () => {
    setShowSelect(!showSelect);
  };
  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSelect(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const [selectedValue, setSelectedValue] = useState(
    isMulti ? [] : value ? value : null
  );
  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return `Choose a ${label}`;
    }
    if (isMulti) {
      return (
        <div className="flex flex-wrap gap-[5px]">
          {selectedValue.map((option) => (
            <div
              key={option.value}
              className="bg-[#ddd] py-[2px] px-[4px] rounded-[2px] flex items-center"
            >
              {option.value}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="flex items-center"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.value;
  };
  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };
  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };
  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue, true);
  };
  return (
    <div className="relative z-0 w-full">
      <div
        ref={inputRef}
        onClick={handleShowOptions}
        className={`bg-gray-50 cursor-pointer border flex justify-between items-center  border-gray-300 text-gray-900 text-sm text-left rounded-lg focus:ring-blue-500 
        focus:border-blue-500 w-full p-[6px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
      >
        {getDisplay()}
        <ChevronDownIcon className="h-3.5" />
      </div>
      {showSelect && (
        <div
          className="absolute p-1 overflow-visible text-gray-700 z-[999] border border-gray-300 dark:border-gray-700 rounded-md 
      shadow-md whitespace-nowrap w-full  top-9 dark:shadow-xl bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
        >
          {options?.map((option) => (
            <button
              onClick={() => onItemClick(option)}
              key={option.value}
              value={option.value}
              className={`pl-2 space-x-2 items-center flex w-full text-left pr-6 py-1 text-sm rounded-md dark:hover:bg-gray-800 hover:bg-gray-200 `}
            >
              {option.Icon}
              <span>{option.value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Filter = ({ column, applyFilter, clearFilter }) => {
  const initValues = () => {
    switch (column.type) {
      case "text":
      case "text-area":
        return "";
      case "price":
      case "number":
        return 0;
      case "status":
      case "select":
        let obj = {};
        column?.options?.forEach((element, i) => {
          obj[element._id] = false;
        });
        return obj;

      default:
        break;
    }
  };

  const [showFilter, setShowFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState(column?.filter || null);
  const [filterValue, setFilterValue] = useState(
    column?.filterValue || initValues()
  );
  const [come, setCome] = useState(false);
  const inputRefFilter = useRef();
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleChangeFilter = (value, a) => {
    setCome(a);
    setFilterSelected(value);
  };
  const handleChangeValue = (e) => {
    setFilterValue(e.target.value);
  };
  const handleApplyFilter = (e) => {
    if (filterSelected) {
      column.typeFilter = e.target.name;
      column.filter = filterSelected;
      column.filterValue = filterValue;
      console.log(column);
      applyFilter(column);
    }
  };
  const handleChangeSelect = (e) => {
    const newValue = { ...filterValue };
    newValue[e.target.name] = !newValue[e.target.name];
    setFilterValue(newValue);

    if (filterValue) {
      column.typeFilter = "select";
      column.filterValue = newValue;
      applyFilter(column);
    }
  };
  const handleChangeNumber = (e) => {
    const input = e.target.value;
    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setFilterValue(input);
  };
  const handleBlurFloat = () => {
    setFilterValue(parseFloat(filterValue) || ""); // The conditional prevents parseFloat(null) = NaN (when the user deletes the input)
  };

  const optionsFilterText = [
    {
      value: "equals",
      Icon: (
        <svg
          className="h-3.5 w-[28px]"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9H19M5 15H19"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: "not equals",
      Icon: (
        <svg
          className="h-3.5 w-[28px]"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9H19M5 15H19M19 5L5 19"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      value: "contains",
      Icon: (
        <span className="py-[1px]  px-1 rounded-md text-[10px] font-semibold border-2 border-gray-300">
          A Z
        </span>
      ),
    },

    {
      value: "starts with",
      Icon: (
        <span className="py-[1px]  px-1 rounded-l-md  text-[10px] font-semibold border-y-2 border-l-2 border-gray-300">
          A Z
        </span>
      ),
    },
    {
      value: "ends with",
      Icon: (
        <span className="py-[1px]  px-1 rounded-r-md  text-[10px] font-semibold border-y-2 border-r-2 border-gray-300">
          A Z
        </span>
      ),
    },
  ];
  const optionsFilterNumber = [
    {
      value: "equals to",
      Icon: (
        <span className="py-[1px]  px-[5px] rounded-md text-sm font-semibold border-2 border-gray-300">
          =
        </span>
      ),
    },
    {
      value: "not equals to",
      Icon: (
        <span className="py-[1px]  px-[5px] rounded-md text-sm font-semibold border-2 border-gray-300">
          &ne;
        </span>
      ),
    },
    {
      value: "greater than",
      Icon: (
        <span className="py-[1px]  px-[5px] rounded-md text-sm font-semibold border-2 border-gray-300">
          &gt;
        </span>
      ),
    },
    {
      value: "greater than or equals to",
      Icon: (
        <span className="py-[1px]  px-[5px] rounded-md text-sm font-semibold border-2 border-gray-300">
          &ge;
        </span>
      ),
    },
    {
      value: "less than",
      Icon: (
        <span className="py-[1px]  px-[5px] rounded-md text-sm font-semibold border-2 border-gray-300">
          &lt;
        </span>
      ),
    },
    {
      value: "less than or equals to",
      Icon: (
        <span className="py-[1px]  px-[5px] rounded-md text-sm font-semibold border-2 border-gray-300">
          &lt;
        </span>
      ),
    },
  ];
  const selectedFilterCols = (i) => {
    switch (column.type) {
      case "text":
      case "text-area":
        return (
          <div className="space-y-2">
            <Select
              label="operator"
              options={optionsFilterText}
              value={filterSelected}
              onChange={handleChangeFilter}
            />

            <InputField
              id={column.value}
              value={filterValue}
              onChange={handleChangeValue}
              placeholder="Filter value"
            />

            <button
              name="string"
              onClick={handleApplyFilter}
              className="w-full button"
            >
              Apply Filter
            </button>
          </div>
        );
      case "price":
      case "number":
        return (
          <div className="space-y-2">
            <Select
              label="operator"
              options={optionsFilterNumber}
              value={filterSelected}
              onChange={handleChangeFilter}
            />

            <InputFieldNumber
              placeholder="Filter value"
              value={filterValue}
              onChange={handleChangeNumber}
              onBlur={handleBlurFloat}
            />

            <button
              name="number"
              onClick={handleApplyFilter}
              className="w-full button"
            >
              Apply Filter
            </button>
          </div>
        );
      case "status":
      case "select":
        return (
          <div>
            {column?.options?.map((option, i) => (
              <div key={i} className="flex items-center p-1">
                <input
                  id={option._id}
                  name={option._id}
                  type="checkbox"
                  value={filterValue[option._id]}
                  checked={filterValue[option._id]}
                  onChange={handleChangeSelect}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-1 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={option._id}
                  className="flex w-full ml-2 space-x-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <span>{option.label}</span>
                </label>
              </div>
            ))}
          </div>
        );
      case "date":
        return (
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              datepicker
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        );
      default:
        break;
    }
  };

  const handleClearFilter = () => clearFilter(column);

  useEffect(() => {
    const handler = (e) => {
      if (
        inputRefFilter.current &&
        !inputRefFilter.current.contains(e.target) &&
        !come
      ) {
        setShowFilter(false);
      }
      setCome(false);
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <div ref={inputRefFilter} className="relative">
      <button
        onClick={handleShowFilter}
        className="flex items-center px-2 py-1 text-sm duration-200 button animate-in slide-in-from-bottom-48"
      >
        <div className="flex items-center h-5 space-x-1">
          {column.Icon}
          <span>{column.label}</span>
          <ChevronDownIcon className="h-5 mt-[2px]" />
        </div>
      </button>

      {showFilter && (
        <div
          className="absolute p-2 min-w-[250px] overflow-visible text-gray-700 z-[999] border border-gray-300 dark:border-gray-700 rounded-md 
      shadow-md  top-8 dark:shadow-xl bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
        >
          <div className="flex items-start justify-between">
            <h3 className="mb-2 mr-10 text-lg font-semibold text-black dark:text-white">
              {column.label}
            </h3>
            <button
              onClick={handleClearFilter}
              className="ml-10 text-sm font-semibold text-blue-500 dark:text-blue-600 hover:text-blue-400 dark:hover:text-blue-500"
            >
              Clear
            </button>
          </div>
          {selectedFilterCols(column)}
        </div>
      )}
    </div>
  );
};

const TablePrueba = ({
  columns,
  data,
  itemsPerPage,
  onSubmitAdd,
  onSubmitEdit,
  onSubmitDelete,
  isEditable,
  filename,
  headersCSV,
  dataCSV,
}) => {
  /* BuildFormState */
  const buildFormState = () => {
    let formState = {};

    columns.forEach((column) => {
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
        case "price":
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
    columns.forEach((column) => {
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
        case "price":
          formState[column.value] = data[column.value];
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
    columns.forEach((column) => {
      formErrors[column.value] = "";
    });
    return formErrors;
  };

  /**
   * * Window Size: state, effect & function *
   */
  const [windowSize, setWindowSize] = useState(getWindowSize());

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
  const [dataAux, setDataAux] = useState(data || []);
  const [columnsAux, setColumnsAux] = useState(columns || []);
  const currentRecords = dataAux?.slice(indexOfFirstRecord, indexOfLastRecord); // Records to be displayed on the current page
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
    scrollToTopTable();
  };

  const handleCancelClick = () => {
    setEditModeId(null);
    setAddModeId(false);
  };

  /**
   *
   * @param {column} column
   * @returns
   */
  const selectedFilterCols = (column) => {
    let sort;
    switch (column.type) {
      case "text":
      case "status":
      case "price":
      case "number":
      case "select":
      case "text-area":
        sort = true;
        break;

      default:
        sort = false;
        break;
    }

    return (
      <SortBy
        sortAvailable={sort}
        column={column}
        sortRecords={sortCurrentRecords}
        hideColumn={hideColumn}
      />
    );
  };

  /**
   * * Funcion to sort a column of the table
   * @param {asc || desc || default} sortType
   * @param {Name of the column} selectedCol
   */
  const sortCurrentRecords = (sortType, selectedCol) => {
    let newSort = [];
    if (sortType !== 0) {
      newSort = [...dataAux];

      newSort.sort((a, b) => {
        switch (selectedCol.type) {
          case "text":
          case "text-area":
            const nameA = a[selectedCol.value].toUpperCase();
            const nameB = b[selectedCol.value].toUpperCase();

            switch (sortType) {
              case "asc":
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                break;
              case "desc":
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1;
                break;
              default:
                break;
            }

            break;
          case "select":
            const newSortOptions = [...selectedCol?.options];

            newSortOptions.sort((c, d) => {
              const optionA = c.name;
              const optionB = d.name;

              switch (sortType) {
                case "asc":
                  if (optionA < optionB) return -1;
                  if (optionA > optionB) return 1;
                  break;
                case "desc":
                  if (optionA > optionB) return -1;
                  if (optionA < optionB) return 1;
                  break;
                default:
                  return 0;
              }

              return 0;
            });
            const objIndexA = newSortOptions.findIndex(
              (obj) => obj._id === a[selectedCol.value]
            );
            const objIndexB = newSortOptions.findIndex(
              (obj) => obj._id === b[selectedCol.value]
            );
            return objIndexA - objIndexB;

          case "number":
          case "status":
          case "price":
            switch (sortType) {
              case "asc":
                return a[selectedCol.value] - b[selectedCol.value];
              case "desc":
                return b[selectedCol.value] - a[selectedCol.value];
              default:
                return 0;
            }

          default:
            break;
        }
        return 0;
      });
    } else {
      newSort = [...data];
    }
    setDataAux(newSort);
  };

  /**
   * * Function to hide a column
   * @param {*} column
   */
  const hideColumn = (column) => {
    let newColumns = [...columnsAux];

    const colIndex = columnsAux.findIndex((col) => col.value === column.value);

    newColumns[colIndex].isHidden = true;

    setColumnsAux(newColumns);
  };

  /**
   * * Check if a column is hidden
   * @returns true or false
   */
  const checkHiddencols = () => {
    return columnsAux.some((val) => val.isHidden === true);
  };

  /**
   * * Function to show a column
   * @param {*} column
   */
  const showColumn = (column) => {
    const newColumns = [...columnsAux];
    const colIndex = columnsAux.findIndex((col) => col.value === column.value);
    newColumns[colIndex].isHidden = false;
    setColumnsAux(newColumns);
  };

  /**
   * * Function to add a filter
   */
  const addFilter = () => {
    const newColumns = [...columnsAux];
    setColumnsAux(newColumns);
  };

  const clearFilter = (column) => {
    const newCols = [...columnsAux];
    const indexCol = newCols.findIndex((obj) => obj.value === column.value);
    delete newCols[indexCol].typeFilter;
    delete newCols[indexCol].filter;
    delete newCols[indexCol].filterValue;
    newCols[indexCol].activeFilter = false;

    setColumnsAux(newCols);

    const count = columnsAux.filter((col) => col.activeFilter).length;

    if (count === 0) setDataAux(data);
    else applyFilter();
  };

  /**
   *
   * @param {string | number | date} type
   * @param {equals | not equals | contains | starts with | ends with} filter
   * @param {the value to search} value
   */
  const applyFilter = () => {
    let dataToFilter = [...data];
    let search = [];

    columnsAux
      .filter((item) => item.activeFilter)
      .forEach((column) => {
        switch (column.typeFilter) {
          case "string":
            switch (column.filter.value) {
              case "equals":
                search = dataToFilter.filter(
                  (data) =>
                    data[column.value].trim().toLowerCase() ===
                    column.filterValue.trim().toLowerCase()
                );
                break;

              case "not equals":
                search = dataToFilter.filter(
                  (data) =>
                    data[column.value].trim().toLowerCase() !==
                    column.filterValue.trim().toLowerCase()
                );
                break;

              case "contains":
                search = dataToFilter.filter((data) =>
                  data[column.value]
                    .trim()
                    .toLowerCase()
                    .includes(column.filterValue.trim().toLowerCase())
                );

                break;

              case "starts with":
                search = dataToFilter.filter((data) =>
                  data[column.value]
                    .trim()
                    .toLowerCase()
                    .startsWith(column.filterValue.trim().toLowerCase())
                );
                break;

              case "ends with":
                search = dataToFilter.filter((data) =>
                  data[column.value]
                    .trim()
                    .toLowerCase()
                    .endsWith(column.filterValue.trim().toLowerCase())
                );
                break;
              default:
                break;
            }
            break;
          case "number":
            switch (column.filter.value) {
              case "equals to":
                search = dataToFilter.filter(
                  (data) => data[column.value] === column.filterValue
                );
                break;
              case "not equals to":
                search = dataToFilter.filter(
                  (data) => data[column.value] !== column.filterValue
                );
                break;
              case "greater than":
                search = dataToFilter.filter(
                  (data) => data[column.value] > column.filterValue
                );
                break;
              case "greater than or equals to":
                search = dataToFilter.filter(
                  (data) => data[column.value] >= column.filterValue
                );
                break;
              case "less than":
                search = dataToFilter.filter(
                  (data) => data[column.value] < column.filterValue
                );
                break;
              case "less than or equals to":
                search = dataToFilter.filter(
                  (data) => data[column.value] >= column.filterValue
                );
                break;

              default:
                break;
            }
            break;
          case "date":
            break;
          case "select":
            const values = column.filterValue;
            const count = Object.keys(values).filter(
              (key) => values[key]
            ).length;

            if (count > 0) {
              Object.keys(values)
                .filter((key) => values[key])
                .forEach((element) => {
                  const localSearch = dataToFilter.filter(
                    (data) =>
                      data[column.value].toString() === element.toString()
                  );
                  search.push.apply(search, localSearch);
                });
            } else {
              search = [...dataToFilter];
            }

            break;
          default:
            break;
        }
        dataToFilter = [...search];
      });
    setCurrentPage(1);
    setDataAux(search);
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="flex-auto w-full overflow-y-hidden">
      {windowSize.innerWidth > 640 ? (
        <div className="flex flex-col w-full h-full">
          <div className="flex items-center justify-between mb-2 border-2 border-transparent">
            <div className="flex items-center space-x-2 ">
              {checkHiddencols() ? (
                <HiddenColumns
                  columns={columnsAux}
                  showColumnFunction={showColumn}
                />
              ) : null}
              <AddFilter columns={columnsAux} addFilter={addFilter} />
              {columnsAux
                .filter((item) => item.activeFilter)
                .map((col, i) => (
                  <Filter
                    key={`${i}_${col.value}`}
                    column={col}
                    addFilter={addFilter}
                    applyFilter={applyFilter}
                    clearFilter={clearFilter}
                  />
                ))}
            </div>
            <div className="flex justify-end flex-initial ">
              {headersCSV && dataCSV && filename && (
                <CSVLink
                  filename={filename}
                  headers={headersCSV}
                  data={dataCSV}
                  className="flex items-center space-x-2 button"
                >
                  <ArrowUpTrayIcon /> <span>Export table</span>
                </CSVLink>
              )}
              {isEditable ? (
                <button
                  type="button"
                  className="flex items-center space-x-2 button"
                  onClick={handleAddClick}
                >
                  <PlusCircleIcon className="h-5" />
                  <span>Add product</span>
                </button>
              ) : null}
            </div>
          </div>

          <div className="relative flex-auto overflow-x-auto overflow-y-scroll border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
            <table className="w-full max-w-full overflow-y-scroll text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="z-[80] sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columnsAux?.map((column, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`px-4 py-2 ${column.width} ${
                        column.isHidden ? "hidden" : ""
                      }`}
                    >
                      {selectedFilterCols(column)}
                    </th>
                  ))}
                  {isEditable ? (
                    <th
                      key={`isEdit_${columns.length + 1}`}
                      scope="col"
                      className="px-6 py-3 w-[5%]"
                    >
                      Actions
                    </th>
                  ) : null}
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
                {currentRecords?.length > 0 ? (
                  <>
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
                            isEditable={isEditable}
                          />
                        )}
                      </Fragment>
                    ))}
                  </>
                ) : (
                  <tr className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                    <NoData visible={addModeId} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex-initial sm:mt-10">
            {/* Pagination */}
            <Pagination
              totalRecords={dataAux?.length}
              pageLimit={recordsPerPage}
              pageNeighbours={1}
              onPageChanged={setCurrentPage}
              currentPage={currentPage}
              scrollToTop={scrollToTop}
            />
          </div>
        </div>
      ) : (
        <>No View on Mobile, we are working to handle phones:D</>
      )}
    </div>
  );
};

export default TablePrueba;
