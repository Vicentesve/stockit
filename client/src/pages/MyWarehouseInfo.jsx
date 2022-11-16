import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CurrentPath from "../components/CurrentPath";
import InputField from "../components/Inputs/InputField";
import { setSubSideNav } from "../redux/sidenavSlice";

const MyWarehouseInfo = () => {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
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
  return (
    <div className="flex flex-col w-full h-screen px-5 py-3 overflow-y-scroll xl:px-10 xl:py-5">
      <CurrentPath arrayPath={buildNavRoute()} />

      <div className="xl:mt-5 xl:w-[60%]">
        <h4 className="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
          My Warehouse Information
        </h4>

        <span className="block mt-1 text-gray-500 font-lgght text-md dark:text-gray-400">
          Here you can change you warehouse information or if you don't have
          create a new one.
        </span>

        <form
          /* onSubmit={handleSubmit(onSubmitForm)} */
          className="xl:w-[40%] space-y-7 mt-5"
        >
          <InputField
            label="Name of the warehouse"
            id="name"
            type="text"
            required
            placeholder="Enter the name of the warehouse"
            register={register}
            validation={{
              required: "Please, enter the name of the warehouse",
            }}
            errors={errors.name ? errors.name.message : ""}
          />
        </form>
      </div>
    </div>
  );
};

export default MyWarehouseInfo;
