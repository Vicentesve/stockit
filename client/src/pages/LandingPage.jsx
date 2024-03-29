import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import FloatBar from "../components/FloatBar";
import Sidebar from "../components/Sidebar";
import { logout } from "../redux/authSlice";
import decode from "jwt-decode";
import TopBar from "../components/TopBar";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/Spinner";

const LandingPage = () => {
  const dispatch = useDispatch();
  const sideNavState = useSelector((state) => state.sidenavState);
  const { user, isSuccess, message, isError, isLoading } = useSelector(
    (state) => state.auth
  );
  const token = user?.token;
  const navigate = useNavigate();

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(logout());
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!isSuccess && !user.hasWarehouse) {
      navigate("/login");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div
      className={`flex flex-col h-screen sm:flex-row ${
        user?.settings?.theme === 2 ? "dark" : ""
      }`}
    >
      {isLoading ? <Spinner /> : null}
      <Sidebar />
      <FloatBar />
      <TopBar />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={`${user?.settings?.theme === 2 ? "dark" : "light"}`}
      />
    </div>
  );
};

export default LandingPage;
