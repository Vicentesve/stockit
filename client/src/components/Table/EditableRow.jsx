import {
  ArrowPathIcon,
  BookmarkSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import InputFieldFloat from "../Inputs/InputFieldFloat";
import InputNumber from "../Inputs/InputNumberFloat";
import Select from "../Inputs/SelectFloat";
import TextArea from "../Inputs/TextAreaFloat";

const EditableRow = ({
  id,
  columns,
  data,
  errors,
  handleCancelClick,
  onSubmitEdit,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(data);
  const [formErrors, setFormErrors] = useState(errors);
  const [images, setImages] = useState([
    {
      product_img_url: formData?.image,
    },
  ]);

  const handleFormChange = (e) => {
    e.preventDefault();

    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;

    setFormData(newFormData);
  };
  const onChangeImage = (imageList) => {
    setImages(imageList);

    const newFormData = { ...formData };
    newFormData["image"] = imageList[0].product_img_url;
    setFormData(newFormData);
  };
  const onChangeSelect = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name].value = e.target.value;
    setFormData(newFormData);
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
          if (formData[column.value] === "") {
            errors[column.value] = `Please, enter a  number`;
            isError = true;
          }
          break;
        case "select":
          if (formData[column.value].value === "0") {
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

    let dataToEdit = {};

    // eslint-disable-next-line array-callback-return
    columns.map((column) => {
      switch (column.type) {
        case "text":
        case "text-area":
        case "image":
          dataToEdit[column.value] = formData[column.value];
          break;
        case "select":
          dataToEdit[column.value] = formData[column.value].value;
          break;
        case "number":
          dataToEdit[column.value] = formData[column.value].toString();
          dataToEdit[column.value] = parseFloat(
            dataToEdit[column.value].replace("$", "").replaceAll(",", "")
          );
          break;

        default:
          break;
      }
    });

    //Put the id to the data to edit
    dataToEdit._id = id;

    dispatch(onSubmitEdit(dataToEdit));
    handleCancelClick();
  };
  const renderSwitch = (columnItem) => {
    switch (columnItem.type) {
      case "text":
        return (
          <InputFieldFloat
            id={columnItem.value}
            type={columnItem.type}
            value={formData[columnItem.value]}
            onChange={handleFormChange}
            error={formErrors[columnItem.value]}
          />
        );

      case "text-area":
        return (
          <TextArea
            id={columnItem.value}
            type={columnItem.type}
            value={formData[columnItem.value]}
            onChange={handleFormChange}
            error={formErrors[columnItem.value]}
          />
        );

      case "number":
        return (
          <InputNumber
            id={columnItem.value}
            value={formData[columnItem.value]}
            onChange={handleFormChange}
            error={formErrors[columnItem.value]}
          />
        );

      case "image":
        return (
          <ImageUploading
            value={images}
            onChange={onChangeImage}
            dataURLKey="product_img_url"
          >
            {({ imageList, onImageUpload }) => (
              // write your building UI
              <div className="flex justify-center w-full h-full">
                <div
                  onClick={onImageUpload}
                  className={`relative w-[150px] h-20 border border-dashed rounded-lg cursor-pointer opacity-60 group hover:border-blue-600 ${
                    images.length > 0 && "hidden"
                  }`}
                >
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                    alt=""
                  ></img>
                  <span className="dark:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-center cursor-pointer group-hover:opacity-80">
                    Click to change the image
                  </span>
                </div>

                {imageList.map((image, i) => (
                  <div
                    key={i}
                    onClick={onImageUpload}
                    className="relative w-[150px] h-20 border border-dashed rounded-lg cursor-pointer group hover:border-blue-600"
                  >
                    <img
                      src={image["product_img_url"]}
                      alt=""
                      className="object-contain w-full h-full rounded-lg opacity-70"
                    />
                    <ArrowPathIcon className="cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] dark:text-white text-black h-7" />
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        );

      case "select":
        return (
          <Select
            id={columnItem.value}
            options={columnItem.options}
            label={columnItem.label}
            value={formData[columnItem.value].value}
            onChange={onChangeSelect}
            error={formErrors[columnItem.value]}
          />
        );

      default:
        return <h1>No match</h1>;
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {columns?.map((columnItem, i) => (
        <td key={i} className="px-6 py-4">
          {renderSwitch(columnItem)}
        </td>
      ))}

      {/* Action buttons */}
      <td className="px-6 py-4 space-x-2 ">
        <button>
          <XMarkIcon
            onClick={handleCancelClick}
            className="h-5 text-red-500 cursor-pointer hover:text-red-400"
          />
        </button>

        <button type="button" onClick={handleFormSubmit}>
          <BookmarkSquareIcon className="h-5 cursor-pointer text-cyan-500 hover:text-cyan-400" />
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
