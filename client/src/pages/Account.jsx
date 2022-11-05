import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CurrentPath from "../components/CurrentPath";
import InputField from "../components/Inputs/InputField";
import ImageUploading from "react-images-uploading";
import InputRadio from "../components/Inputs/InputRadio";
import { updateMe } from "../redux/authSlice";
import { setSubSideNav } from "../redux/sidenavSlice";

const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [profilePic, setProfilePic] = useState([
    { profilePic: user?.profilePic },
  ]);
  const onChangeImage = (imageList) => {
    setProfilePic(imageList);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      lastname: user?.lastname,
      gender: user?.gender,
    },
  });

  const onSubmitForm = (data) => {
    data.profilePic = profilePic[0]["profilePic"];
    data.id = user._id;
    data.type = "account";
    console.log(data);
    dispatch(updateMe({ data, setError }));
  };

  const buildNavRoute = () => {
    const arrayPath = window.location.pathname.split("/");
    let navPath = [];
    let concatRoute = "";
    // eslint-disable-next-line array-callback-return
    arrayPath.map((data) => {
      const dataPush = {};

      if (data === "") {
        dataPush.route = "/";
        dataPush.name = "";
      } else {
        dataPush.route = `${concatRoute}/${data}`;
        dataPush.name = data;
        concatRoute = concatRoute.concat(dataPush.route);
      }
      navPath.push(dataPush);
    });
    navPath[1].onClick = () => dispatch(setSubSideNav(true));

    return navPath;
  };

  return (
    <div className="flex flex-col w-full h-screen px-5 py-3 overflow-y-scroll sm:px-10 sm:py-5">
      <CurrentPath arrayPath={buildNavRoute()} />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="h-full xl:mt-5 xl:flex xl:flex-row-reverse"
      >
        <div className="xl:w-[60%] space-y-5 xl:ml-20">
          <p className="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
            Profile photo
          </p>
          <ImageUploading
            value={profilePic}
            onChange={onChangeImage}
            dataURLKey="profilePic"
          >
            {({ onImageUpload }) => (
              <div className="flex flex-col justify-center space-y-5 w-[300px] items-center">
                <div className="w-[150px] h-[150px] xl:w-[300px] xl:h-[300px] rounded-full ">
                  <img
                    className="block object-cover w-full h-full rounded-full "
                    src={profilePic[0]["profilePic"]}
                    alt=""
                  />
                </div>
                <button
                  onClick={onImageUpload}
                  type="button"
                  className="button"
                >
                  Change photo
                </button>
              </div>
            )}
          </ImageUploading>
        </div>

        <div className="xl:w-[40%] flex flex-col mt-5 xl:mt-0">
          <p className="text-lg font-light text-gray-500 md:text-xl dark:text-gray-400">
            User Information
          </p>
          <span className="mt-1 text-gray-500 font-lgght text-md dark:text-gray-400">
            Here you can edit public information about yourself. <br />
            The changes will be displayed for other users or customers.
          </span>

          <div className="flex flex-col mt-5 space-y-5">
            {/* Email */}
            <InputField
              label="Email adddress"
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              register={register}
              validation={{
                required: "Please, enter the email",
              }}
              errors={errors.email ? errors.email.message : ""}
            />
            {/* Full name */}
            <div className="flex space-x-5">
              <InputField
                label="Name"
                id="name"
                type="name"
                required
                placeholder="Enter your name"
                register={register}
                validation={{
                  required: "Please, enter the name",
                }}
                errors={errors.name ? errors.name.message : ""}
              />
              <InputField
                label="Lastname"
                id="lastname"
                type="lastname"
                required
                placeholder="Enter your lastname"
                register={register}
                validation={{
                  required: "Please, enter the lastname",
                }}
                errors={errors.lastname ? errors.lastname.message : ""}
              />
            </div>

            <InputRadio
              id="gender"
              label="Gender"
              options={[
                { value: 1, name: "Female" },
                { value: 2, name: "Male" },
                { value: 3, name: "Non-binary" },
              ]}
              register={register}
              validation={{
                required: "Please, enter the gender",
              }}
              errors={errors.gender ? errors.gender.message : ""}
            />
          </div>

          <div className="flex justify-end mt-10">
            <button className="button w-[100px]" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
