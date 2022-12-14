import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Store/Header";
import Navbar from "../../components/Store/Navbar";
import Spinner from "../../components/Spinner";
import { getWarehousesPreview } from "../../redux/storeSlice";
import { getCategories } from "./../../redux/categoriesSlice";
import { Outlet } from "react-router-dom";
import HeaderMobile from "../../components/Store/HeaderMobile";
import SidebarMobile from "../../components/Store/SidebarMobile";
import BackGroundOpacity from "../../components/Store/BackGroundOpacity";
import { ToastContainer } from "react-toastify";

const LandingPage = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.auth);
  const { hoverCard, subsidenavValue } = useSelector(
    (state) => state.sidenavState
  );

  document.body.style.overflow = subsidenavValue ? "hidden" : "auto";
  document.body.style.overflow = hoverCard ? "hidden" : "auto";

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWarehousesPreview());
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gray-300/50">
      {isLoading ? <Spinner /> : null}
      <Header categories={categories} />
      <HeaderMobile options={categories} />
      <Navbar categories={categories} />
      <SidebarMobile categories={categories} />

      <BackGroundOpacity />

      <div className="relative h-full">
        <div
          className={`absolute top-0 w-full h-screen overflow-hidden bg-black_rgba z-[80] ${
            !hoverCard && "hidden"
          }`}
        ></div>
        <Outlet />
      </div>

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
      />
    </div>
  );
};

export default LandingPage;
