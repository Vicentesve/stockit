import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CurrentPath from "../components/CurrentPath";
import InputField from "../components/Inputs/InputField";
import PasswordRequirements from "../components/PasswordRequirements";
import { updateMe } from "../redux/authSlice";
import { setSubSideNav } from "../redux/sidenavSlice";
const Security = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const buildNavRoute = () => {
    const arrayPath = window.location.pathname.split("/");
    arrayPath.shift();
    let navPath = [];
    let concatRoute = "";
    // eslint-disable-next-line array-callback-return
    arrayPath.map((data, i) => {
      const dataPush = {};

      dataPush.route = `${concatRoute}/${data}`;
      dataPush.name = data;
      concatRoute = concatRoute.concat(`/${data}`);
      navPath.push(dataPush);
    });
    navPath[1].onClick = () => dispatch(setSubSideNav(true));

    return navPath;
  };

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmitForm = (data) => {
    data.id = user._id;
    data.type = "security";
    dispatch(updateMe({ data, setError, handleClear }));
  };

  const handleClear = () => {
    reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex flex-col w-full h-screen px-5 py-3 overflow-y-scroll xl:px-10 xl:py-5">
      <CurrentPath arrayPath={buildNavRoute()} />

      <div className="xl:mt-5 xl:w-[60%]">
        <h4 className="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
          Password
        </h4>
        <span className="block mt-1 text-gray-500 font-lgght text-md dark:text-gray-400">
          Here you can change your password and set the time your session token
          expire.
        </span>

        <div className="h-full mt-5 xl:flex xl:flex-row-reverse xl:justify-end">
          {/* Instruccion password */}
          <div className="xl:ml-20">
            <PasswordRequirements />
          </div>
          {/* Password Form */}
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="xl:w-[40%] space-y-7"
          >
            <InputField
              label="Current password"
              id="currentPassword"
              type="password"
              required
              placeholder="Enter your current password"
              register={register}
              validation={{
                required: "Please, enter your current password",
              }}
              errors={
                errors.currentPassword ? errors.currentPassword.message : ""
              }
            />

            <InputField
              label="New password"
              id="newPassword"
              type="password"
              required
              placeholder="Enter your new password"
              register={register}
              validation={{
                required: "Please, enter your new password",
                minLength: {
                  value: 8,
                  message: "Minium 8 characters",
                },
                validate: {
                  passwordRequirements: (value) => {
                    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
                    const atLeastOneNumeric = /[0-9]/g;
                    const atLeastOneLowercase = /[A-Z]/g;

                    if (!value.match(atLeastOneSpecialChar))
                      return "Must contain at least one special character";

                    if (!value.match(atLeastOneNumeric))
                      return "At least one number";

                    if (!value.match(atLeastOneLowercase))
                      return "At least one uppercase character";
                  },
                },
              }}
              errors={errors.newPassword ? errors.newPassword.message : ""}
            />

            <InputField
              label="Confirm password"
              id="confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              register={register}
              validation={{
                required: "Please, confirm your password",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { newPassword } = getValues();
                    return newPassword === value || "Passwords must match";
                  },
                },
              }}
              errors={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />

            <button className="float-right button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
