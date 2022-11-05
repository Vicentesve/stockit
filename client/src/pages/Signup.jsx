import React, { useEffect } from "react";
import InputField from "../components/Inputs/InputField";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import InputRadio from "../components/Inputs/InputRadio";
import { useDispatch, useSelector } from "react-redux";
import { reset, signup } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSignUp = (data) => {
    dispatch(signup({ data, setError }));
  };

  useEffect(() => {
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
    }
  }, [user, isSuccess, navigate, dispatch]);

  return (
    <div className="dark">
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col h-full px-5 bg-gray-100 md:h-screen dark:bg-gray-900 md:px-10 lg:justify-center lg:items-center">
        <div className="w-full border border-gray-200 rounded-md shadow-md lg:bg-white dark:border-transparent xl:w-[70%] lg:flex h-fit lg:dark:bg-gray-800">
          {/* Image */}
          <div className="w-[50%] h-full overflow-hidden hidden lg:block rounded-l-md">
            <img
              className="object-cover h-full"
              src="/images/warehouse_login.jpg"
              alt=""
            />
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSignUp)}
            className="lg:w-[50%] w-full lg:px-10"
          >
            <div className="mt-5">
              <Logo />
            </div>

            {/* Welcome */}
            <div className="mt-5 mb-5">
              <h3 className="dark:text-white font-semibold text-2xl tracking-[1px]">
                Hi, Create an account!👋
              </h3>
              <p className="mt-1 text-gray-400 dark:text-gray-500">
                Please, enter your details!
              </p>
            </div>

            {/* Inputs */}
            <div className="flex flex-col space-y-5">
              <div className="space-y-5 lg:flex lg:space-x-5 md:space-y-0">
                <InputField
                  label="Name"
                  id="name"
                  type="text"
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
                  type="text"
                  required
                  placeholder="Enter your lastname"
                  register={register}
                  validation={{
                    required: "Please, enter the lastname",
                  }}
                  errors={errors.lastname ? errors.lastname.message : ""}
                />
              </div>
              <InputField
                label="Email"
                id="email"
                type="text"
                required
                placeholder="Enter your email"
                register={register}
                validation={{
                  required: "Please, enter the email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                }}
                errors={errors.email ? errors.email.message : ""}
              />
              <InputField
                label="User"
                id="user"
                type="text"
                required
                placeholder="Enter your user"
                register={register}
                validation={{
                  required: "Please, enter the user",
                }}
                errors={errors.user ? errors.user.message : ""}
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                register={register}
                validation={{
                  required: "Please, enter the password",
                }}
                errors={errors.password ? errors.password.message : ""}
              />

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

            {/* Button & create account */}
            <div className="my-10">
              <button className="button">Sign up</button>
              {/* Create an account */}
              <p className="text-sm text-center text-gray-400 dark:text-gray-500">
                Already have an account?{" "}
                <a
                  className="font-semibold text-black dark:text-white hover:underline"
                  href="/login"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
