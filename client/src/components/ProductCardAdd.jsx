import React, { useState } from "react";
import InputNumber from "./Inputs/InputNumber";
import Select from "./Inputs/Select";
import ImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";
import InputField from "./Inputs/InputField";
import TextArea from "./Inputs/TextArea";
import { useDispatch } from "react-redux";

const ProductCardAdd = ({ data, options, onSubmitAdd, handleCancelClick }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: data ? data : null,
  });

  const [images, setImages] = useState([
    {
      product_img_url:
        "https://flowbite.com/docs/images/examples/image-1@2x.jpg",
    },
  ]);
  const onChangeImage = (imageList) => {
    setImages(imageList);
    setValue("image", imageList[0].product_img_url);
  };

  /**
   * * Function to submit data
   */
  const handleFormSubmit = (data) => {
    data.price = parseFloat(data.price.replace("$", "").replaceAll(",", ""));
    dispatch(onSubmitAdd(data));
    handleCancelClick();
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[650px] dark:bg-gray-800 dark:border-gray-700  my-5 px-5 py-2">
      <p className="font-light text-gray-500 dark:text-gray-400">
        Complete the form to add a new product
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-5">
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
            placeholder="Enter your name"
            register={register}
            validation={{
              required: "Please, enter the name",
            }}
            errors={errors.name ? errors.name.message : ""}
          />

          <InputNumber
            id="price"
            label="Price"
            control={control}
            placeholder="Enter the price"
            validation={{
              required: "Please, enter the price",
              validate: {
                greaterThan0: (value) =>
                  parseFloat(value.replace("$", "")) > 0 ||
                  "Should be greater than 0",
              },
            }}
            setValue={setValue}
            errors={errors.price ? errors.price.message : ""}
          />

          <Select
            id="category"
            options={options}
            label="Category"
            register={register}
            validation={{
              validate: {
                hasCategory: (value) => {
                  if (value === "0") return "Please, enter the category";
                },
              },
            }}
            errors={errors.category ? errors.category.message : ""}
          />

          <TextArea
            id="description"
            register={register}
            validation={{
              required: "Please, enter the description",
            }}
            errors={errors.description ? errors.description.message : ""}
            placeholder="Enter the description"
            rows={3}
            label="Description"
          />

          <div className="flex justify-end space-x-5">
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
        </div>
      </form>
    </div>
  );
};

export default ProductCardAdd;
