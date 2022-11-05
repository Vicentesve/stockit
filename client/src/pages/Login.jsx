import React, { useEffect } from "react";
import CheckBox from "../components/Inputs/CheckBox";
import InputField from "../components/Inputs/InputField";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../redux/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
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

  const onLogin = (data) => {
    dispatch(login({ data, setError }));
  };

  useEffect(() => {
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
    }
  }, [user, isSuccess, navigate, dispatch]);

  return (
    <div className="">
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col h-screen px-5 py-5 lg:bg-gray-100 dark:bg-gray-900 md:px-10 lg:px-20 lg:justify-center lg:items-center">
        <div className="lg:bg-white border-transparent border lg:border-gray-200 dark:border-transparent lg:shadow-md lg:flex lg:h-fit xl:h-[70%] xl:w-[60%] lg:dark:bg-gray-800 rounded-md mt-5">
          {/* Image */}
          <div className="w-[50%] h-full overflow-hidden hidden lg:block rounded-l-md">
            <img
              className="object-contain "
              src="/images/warehouse_login.jpg"
              alt=""
            />
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit(onLogin)}
            className="lg:w-[50%] w-full mt-10 lg:px-10"
          >
            <Logo />

            {/* Welcome */}
            <div className="mt-10 mb-5">
              <h3 className="dark:text-white font-semibold text-2xl tracking-[2px]">
                Hi, Welcome Back!👋
              </h3>
              <p className="mt-1 text-gray-400 dark:text-gray-500">
                Hello again, you´ve been missed!
              </p>
            </div>

            {/* Inputs */}
            <div className="flex flex-col space-y-5">
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

              <CheckBox id="remember_me" label="Remember Me" />

              <div className="text-sm text-right text-blue-600">
                <a className="hover:underline" href="/forgot-password">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Button & create account */}
            <div className="mt-10">
              <button className="button">Login</button>
              {/* Create an account */}
              <p className="text-sm text-center text-gray-400 dark:text-gray-500">
                Dont have an account?{" "}
                <a
                  className="font-semibold text-black dark:text-white hover:underline"
                  href="/signup"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
