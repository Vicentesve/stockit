import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import InputField from "../Inputs/InputField";
import InputNumber from "../Inputs/InputNumber";
import Select from "../Inputs/Select";
import TextArea from "../Inputs/TextArea";

export const TableMobilePrueba = ({ product, options }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      image: product?.image,
      name: product?.name,
      category: product?.category,
      description: product?.description,
      price: product?.price,
    },
  });

  const [isEditId, setIsEditId] = useState(null);
  const [images, setImages] = useState([{ product_img_url: product?.image }]);
  const [price, setPrice] = useState(product?.price);

  const findCategory = () => {
    const objIndex = options.findIndex((obj) => obj._id === product.category);
    return objIndex;
  };

  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };

  const onChangeImage = (imageList) => {
    setImages(imageList);
    setValue("image", imageList[0].product_img_url);
  };

  const onChangeNumber = (value, name) => {
    setValue(name, parseFloat(value));
    setPrice(parseFloat(value));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const resetFields = () => {
    reset({
      image: product?.image,
      name: product?.name,
      category: product?.category,
      description: product?.description,
      price: product?.price,
    });
  };

  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md h-[500px] dark:bg-gray-800 dark:border-gray-700 group perspective">
        <div
          className={`relative w-full h-full duration-1000 preserve-3d  
        ${isEditId === product?._id ? "my-rotate-y-180" : ""}`}
        >
          <div className="absolute w-full h-full backface-hidden">
            <img
              className="p-8 rounded-t-lg h-[300px] mx-auto"
              src={product.image}
              alt=""
            />

            <div className="px-5 pb-5">
              <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <p className="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
                {options[findCategory()].name}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currencyFormat(product.price)}
                </span>
              </div>

              <div className="flex justify-end space-x-5">
                <button
                  type="button"
                  className="w-[80px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditId(product._id)}
                  className="w-[80px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="absolute w-full h-full max-w-sm bg-white rounded-lg shadow-md my-rotate-y-180 backface-hidden dark:bg-gray-800 ">
            <div className="px-5 py-2">
              <p className="font-light text-gray-500 dark:text-gray-400">
                Complete the form to edit this product
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 space-y-5"
              >
                <ImageUploading
                  value={images}
                  onChange={onChangeImage}
                  dataURLKey="product_img_url"
                >
                  {({ onImageUpload }) => (
                    // write your building UI
                    <div className="flex items-center justify-center ">
                      <div className="w-[60%] h-[120px] mx-auto flex flex-col items-center space-y-2">
                        <img
                          src={images[0]["product_img_url"]}
                          alt=""
                          className="object-contain h-[80px] mx-auto "
                        />
                        <button
                          onClick={onImageUpload}
                          type="button"
                          className="px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Change image
                        </button>
                      </div>
                      <div className="space-y-5">
                        <InputNumber
                          id="price"
                          label="Price"
                          value={price}
                          onChange={onChangeNumber}
                          placeholder="Enter the price"
                        />

                        <Select
                          id="category"
                          options={options}
                          label="Category"
                          register={register}
                          validation={{
                            validate: {
                              hasCategory: (value) => {
                                if (value === "0")
                                  return "Please, enter the category";
                              },
                            },
                          }}
                          errors={
                            errors.category ? errors.category.message : ""
                          }
                        />
                      </div>
                    </div>
                  )}
                </ImageUploading>

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
                    onClick={() => {
                      setIsEditId(null);
                      resetFields();
                    }}
                    className="w-[80px] px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg focus:outline-none hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[80px] px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
