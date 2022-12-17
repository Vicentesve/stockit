import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import InputMaskField from "../../components/Inputs/InputMaskField";
import Spinner from "../../components/Spinner";
import creditCardType from "credit-card-type";
import Cards from "react-credit-cards-2";
import { setPayment, reset, editPayment } from "../../redux/storeSlice";

const NewPayment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.store.isLoading);
  const myPayments = useSelector((state) => state.store.myPayments);
  const message = useSelector((state) => state.store.message);
  const isError = useSelector((state) => state.store.isError);
  const isSuccess = useSelector((state) => state.store.isSuccess);

  const [data, setData] = useState({
    cvc: location?.state?.payment.cvc || "",
    expiry: location?.state?.payment.expiry || "",
    focus: "",
    name: location?.state?.payment.name || "",
    number: location?.state?.payment.number || "",
    isDefault: location?.state?.payment?.isDefault || false,
  });

  const [errors, setErrors] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setData({ ...data, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "isDefault") {
      setData({ ...data, isDefault: !data.isDefault });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleValidations()) return; // If there is an error, then return.
    if (location?.state?.isEdit) {
      const formData = {};
      formData._id = location?.state?.payment._id;
      formData.expiry = data?.expiry;
      formData.name = data?.name;
      formData.isDefault = data?.isDefault;
      dispatch(editPayment({ formData, navigate }));
    } else {
      if (myPayments.lenght <= 0) data.isDefault = true;

      const formData = { ...data };
      formData.customerId = user?._id;
      formData.number = formData.number.replace(/\s+/g, "");
      formData.issuer = creditCardType(data.number)[0].type;
      dispatch(setPayment({ formData, navigate }));
    }
  };

  const handleValidations = () => {
    /* All */
    let localErrors = {};
    let isError = false;
    for (const key in data) {
      if (data[key] === "" && key !== "focus") {
        isError = true;
        localErrors[key] = `Please, enter the ${key}`;
      }
    }

    setErrors(localErrors);
    /* Number */
    if (data.number.replace(/\s+/g, "").length !== 16 && data.number !== "") {
      isError = true;
      localErrors.number = "Invalid number card";
    }
    if (creditCardType(data.number).length <= 0 && !location?.state?.isEdit) {
      isError = true;
      localErrors.number = "Invalid number card";
    }

    if (data.cvc.length !== 3 && data.cvc !== "") {
      isError = true;
      localErrors.cvc = "Invalid CVC/CVV";
    }

    const exMonth = data.expiry.split("/")[0];
    const exYear = "20" + data.expiry.split("/")[1];
    const today = new Date();
    const someday = new Date();
    someday.setFullYear(exYear, exMonth, 1);

    if (data.expiry.replace("/", "").length !== 4 && data.expiry !== "") {
      isError = true;
      localErrors.expiry = "Invalid expiry date";
    } else if (someday < today) {
      isError = true;
      localErrors.expiry = "The expiry date is before today's date";
    }

    setErrors(localErrors);
    return isError;
  };

  useEffect(() => {
    const setServerErrors = () => {
      return { number: message?.number };
    };

    if (isError) {
      setErrors(() => setServerErrors());
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch, navigate, isSuccess, message?.number]);

  return (
    <div className="w-full min-h-screen overflow-hidden bg-white">
      {isLoading ? <Spinner /> : null}
      <div className="w-full max-w-screen-md p-2 mx-auto overflow-hidden bg-white">
        <h3 className="w-full col-span-3 col-start-1 mb-5 text-3xl font-semibold">
          Add a new method payment
        </h3>

        <Cards
          cvc={data.cvc}
          expiry={data.expiry}
          focused={data.focus}
          name={data.name}
          number={data.number}
          preview={location?.state?.isEdit ? true : false}
          issuer={
            location?.state?.isEdit ? location?.state?.payment?.issuer : ""
          }
        />
        <form className="mt-5 " onSubmit={onSubmit}>
          <div className="space-y-7">
            {location?.state?.isEdit ? null : (
              <InputMaskField
                id="number"
                value={data.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                mask="9999 9999 9999 9999"
                placeholder="1234 5678 9012"
                label="Enter the card number"
                errors={errors.number}
              />
            )}

            <div className="relative w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name on card
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter the name on the card"
              />
              <span className="absolute mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                {errors.name}
              </span>
            </div>

            <div className="flex space-x-5">
              <InputMaskField
                id="expiry"
                value={data.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                mask="99/99"
                label="Enter the expiration date"
                placeholder="08/27"
                errors={errors.expiry}
              />

              {location?.state?.isEdit ? null : (
                <InputMaskField
                  id="cvc"
                  value={data.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  mask="999"
                  placeholder="634"
                  label="Enter the CVC/CVV"
                  errors={errors.cvc}
                />
              )}
            </div>

            <div class="flex items-center ">
              <input
                id="isDefault"
                name="isDefault"
                type="checkbox"
                checked={data.isDefault}
                value={data.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="isDefault"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Set as default
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="p-2 my-3 mt-10 text-xs border border-yellow-300 rounded-md md:text-sm bg-gradient-to-b focus:ring-2 from-yellow-200 to-yellow-400 active:from-yellow-500 focus:ring-yellow-500 hover:bg-gradient-to-b hover:from-yellow-100 hover:to-yellow-300"
          >
            {location?.state?.isEdit ? "Edit payment" : "Add payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPayment;
