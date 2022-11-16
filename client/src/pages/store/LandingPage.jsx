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

const LandingPage = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.auth);
  const { hoverCard } = useSelector((state) => state.sidenavState);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWarehousesPreview());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-300/50">
      {isLoading ? <Spinner /> : null}
      <Header categories={categories} />
      <HeaderMobile />
      <Navbar categories={categories} />
      <div className="relative ">
        <div
          className={`absolute top-0 w-full h-full bg-black_rgba z-[80] ${
            !hoverCard && "hidden"
          }`}
        ></div>

        <Outlet />
      </div>

      <main className="mx-auto max-w-screen-2xl "></main>
    </div>
  );
};

export default LandingPage;
