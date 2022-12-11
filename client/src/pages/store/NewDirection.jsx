import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/Inputs/InputField";
import Select from "../../components/Inputs/Select";
import { setAddress } from "../../redux/storeSlice";
import Spinner from "./../../components/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
const NewDirection = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: location?.state?.address ? location?.state?.address : "",
  });
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.store.isLoading);

  const onSubmit = (data) => {
    if (currentCountry === "0") {
      setErrorCountry("Please, enter the country");
      return;
    }
    data.customerId = user?._id;
    data.country = currentCountry;
    console.log(data);
    dispatch(setAddress(data));
    navigate("/my-account/my-addresses");
  };

  const [countries, setAllCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(
    location?.state?.address?.country
  );
  const [errorCountry, setErrorCountry] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((countries) => {
        setAllCountries(countries);
      })
      .finally(() => {
        setValue("country", location?.state?.address?.country);
      });
  }, [location?.state?.address, setValue]);

  return (
    <div className="w-full min-h-screen bg-white">
      {isLoading ? <Spinner /> : null}
      <div className="w-full max-w-screen-md p-2 mx-auto bg-white ">
        <h3 className="w-full col-span-3 col-start-1 text-3xl font-semibold ">
          Add a new address
        </h3>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Select
              id="country"
              label="Country"
              options={countries}
              value={currentCountry}
              onChange={setCurrentCountry}
              reference="common"
              errors={errorCountry}
            />

            <InputField
              label="Full name"
              id="name"
              type="text"
              required
              placeholder="Enter your full name"
              register={register}
              validation={{
                required: "Please, enter the name",
              }}
              errors={errors.name ? errors.name.message : ""}
            />

            <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-3">
              <InputField
                label="Street and Number"
                id="streetNumber"
                type="text"
                required
                placeholder="Street, ext & int number"
                register={register}
                validation={{
                  required: "Please, enter street and number",
                }}
                errors={errors.streetNumber ? errors.streetNumber.message : ""}
              />

              <InputField
                label="State/Province/Region"
                id="state"
                type="text"
                required
                placeholder="State/Province/Region"
                register={register}
                validation={{
                  required: "Please, enter the state, province or region",
                }}
                errors={errors.state ? errors.state.message : ""}
              />
            </div>

            <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-3">
              <div className="sm:w-[33%]">
                <InputField
                  label="City"
                  id="city"
                  type="text"
                  required
                  placeholder="City"
                  register={register}
                  validation={{
                    required: "Please, enter the city",
                  }}
                  errors={errors.city ? errors.city.message : ""}
                />
              </div>

              <div className="flex space-x-3 ">
                <InputField
                  label="Suburb"
                  id="suburb"
                  type="text"
                  required
                  placeholder="Suburb"
                  register={register}
                  validation={{
                    required: "Please, enter the suburb",
                  }}
                  errors={errors.suburb ? errors.suburb.message : ""}
                />

                <InputField
                  label="Postal Code"
                  id="postalCode"
                  type="text"
                  required
                  placeholder="Enter your postal code"
                  register={register}
                  validation={{
                    required: "Please, enter the postal code",
                  }}
                  errors={errors.postalCode ? errors.postalCode.message : ""}
                />
              </div>
            </div>

            <InputField
              label="Phone Number"
              id="phoneNumber"
              type="text"
              required
              placeholder="Phone number"
              register={register}
              validation={{
                required: "Please, enter the phone number",
              }}
              errors={errors.phoneNumber ? errors.phoneNumber.message : ""}
            />
          </div>
          <h3 className="mt-5 text-lg font-semibold">
            Add delivery instructions
          </h3>
          <InputField
            label="Any additional instructions to access the building? (Optional)"
            id="extraInfo"
            type="text"
            required
            placeholder="1234"
            register={register}
            validation={{}}
            errors={errors.extraInfo ? errors.extraInfo.message : ""}
          />

          <button
            type="submit"
            className="p-2 my-3 text-xs border border-yellow-300 rounded-md md:text-sm bg-gradient-to-b focus:ring-2 from-yellow-200 to-yellow-400 active:from-yellow-500 focus:ring-yellow-500 hover:bg-gradient-to-b hover:from-yellow-100 hover:to-yellow-300"
          >
            Add direction
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDirection;
