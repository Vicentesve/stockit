import React, { useState } from "react";
import InputNumber from "./Inputs/InputNumber";
import Select from "./Inputs/Select";
import ImageUploading from "react-images-uploading";
import InputField from "./Inputs/InputField";
import TextArea from "./Inputs/TextArea";
import { useDispatch } from "react-redux";

const ProductCardAdd = ({
  addFormData,
  handleCancelClick,
  errors,
  columns,
  onSubmitAdd,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(addFormData);
  const [formErrors, setFormErrors] = useState(errors);

  const handleFormChange = (e) => {
    e.preventDefault();

    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;

    setFormData(newFormData);
  };
  const [images, setImages] = useState([
    {
      product_img_url:
        "https://flowbite.com/docs/images/examples/image-1@2x.jpg",
    },
  ]);
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

    const dataToAdd = {
      image: formData.image,
      name: formData.name,
      price: formData.price.toString(),
      category: formData.category.value,
      description: formData.description,
    };

    dataToAdd.price = parseFloat(
      dataToAdd.price.replace("$", "").replaceAll(",", "")
    );

    dispatch(onSubmitAdd(dataToAdd));

    handleCancelClick();
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[650px] dark:bg-gray-800 dark:border-gray-700  my-5 px-5 py-2">
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Complete the form to add a new product
      </p>

      <form onSubmit={handleFormSubmit} className="mt-5">
        <ImageUploading
          value={images}
          onChange={onChangeImage}
          dataURLKey="product_img_url"
        >
          {({ onImageUpload }) => (
            // write your building UI
            <div className="h-[120px] flex flex-col items-center space-y-3">
              <img
                src={images[0]["product_img_url"]}
                alt=""
                className="object-contain h-[80px] rounded-lg w-full"
              />
              <button
                onClick={onImageUpload}
                type="button"
                className="px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add image
              </button>
            </div>
          )}
        </ImageUploading>

        <div className="space-y-5">
          <InputField
            label="Product name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Enter your name"
            errors={formErrors?.name}
          />

          <InputNumber
            id="price"
            label="Price"
            value={formData.price}
            onChange={handleFormChange}
            placeholder="Enter the price"
            errors={formErrors?.price}
          />

          <Select
            id="category"
            options={addFormData.category.options}
            label="Category"
            value={formData.category.value}
            onChange={onChangeSelect}
            errors={formErrors?.category}
          />

          <TextArea
            id="description"
            value={formData.description}
            onChange={handleFormChange}
            errors={formErrors?.description}
            placeholder="Enter the description"
            rows={3}
            label="Description"
          />
        </div>

        <div className="flex justify-end mt-10 space-x-5">
          <button
            type="button"
            onClick={handleCancelClick}
            className="w-[80px] px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[80px]  px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCardAdd;
