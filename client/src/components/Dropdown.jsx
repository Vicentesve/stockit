import React, { useEffect, useRef, useState } from "react";
import Popup from "./Popup";

const Icon = () => {
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

const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

const CheckIcon = () => {
  return (
    <svg
      aria-hidden="true"
      className="h-4 absolute left-[-20px] top-[2px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 12.75l6 6 9-13.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const ChevronDoubleRightIcon = () => {
  return (
    <svg
      aria-hidden="true"
      height="20"
      width="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const Dropdown = ({
  id,
  placeHolder,
  options,
  isMulti,
  isSearchable,
  value,
  onChange,
  handleSubmit,
  hasPop,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    isMulti ? [] : value ? value : null
  );
  const [selectedValueAux, setSelectedValueAux] = useState(
    isMulti ? [] : value ? value : null
  );
  const [searchValue, setSearchValue] = useState("");
  const [popUpState, setPopUpState] = useState(false);
  const [labelPopup, setLabelPopup] = useState(null);
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
    setSelectedValue(value);
  }, [showMenu, value]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="flex flex-wrap gap-[5px]">
          {selectedValue.map((option) => (
            <div
              key={option._id}
              className="bg-[#ddd] py-[2px] px-[4px] rounded-[2px] flex items-center"
            >
              {option.label}
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
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o._id !== option._id);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o._id === option._id) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    if (hasPop) {
      setSelectedValueAux(newValue);
      setLabelPopup(
        <div className="mb-3">
          <p>You are going to change the status</p>
          <div className="flex justify-center mt-2 space-x-2">
            <span className={`block ${selectedValue.style}`}>
              {selectedValue.label}
            </span>
            <ChevronDoubleRightIcon />
            <span className={`block ${option.style}`}>{option.label}</span>
          </div>
        </div>
      );
      setPopUpState(true);
    } else {
      setSelectedValue(newValue);
      onSubmit(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o._id === option._id).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue._id === option._id;
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options?.filter(
      (option) =>
        option?.label?.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  const onSubmit = (newValue) => {
    if (hasPop) {
      setSelectedValue(selectedValueAux);
      const data = {
        idOrder: id,
        newStatus: selectedValueAux._id,
      };
      handleSubmit(data);
      setPopUpState(false);
    } else {
      handleSubmit(newValue);
    }
  };

  return (
    <>
      <div className="relative">
        <div
          ref={inputRef}
          onClick={handleInputClick}
          className={`flex items-center justify-between space-x-1 select-none ${
            selectedValue?.style
              ? selectedValue?.style
              : "border border-gray-300 p-1 rounded-md min-w-[200px] max-w-[200px] text-sm"
          }`}
        >
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <Icon />
        </div>
        {showMenu && (
          <div
            className="absolute p-1 cursor-pointer rounded-md shadow-md dark:shadow-lg z-[999] whitespace-nowrap  text-gray-700  
          bg-gray-50 dark:bg-gray-900 dark:text-gray-200 border border-gray-200 "
          >
            {isSearchable && (
              <div className="search-box">
                <input
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                />
              </div>
            )}
            {getOptions()?.map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option._id}
                className={`px-8 py-1 text-sm rounded-md dark:hover:bg-gray-800 hover:bg-gray-200 ${
                  isSelected(option) && "text-blue-500 dark:text-blue-600"
                }`}
              >
                <span className="relative">
                  {isSelected(option) && <CheckIcon />}
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {popUpState && (
        <Popup
          handleClose={() => setPopUpState(false)}
          question="Are you sure you want to change the status?"
          content={labelPopup}
          handleFormFunction={onSubmit}
        />
      )}
    </>
  );
};

export default Dropdown;
