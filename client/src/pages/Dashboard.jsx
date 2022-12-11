import React from "react";
import SalesByCategory from "../components/Charts/SalesByCategory";
import CurrentPath from "../components/CurrentPath";
import { setSubSideNav } from "../redux/sidenavSlice";
import { useDispatch } from "react-redux";
import OverviewStatistic from "../components/Charts/OverviewStatistic";

const Dashboard = () => {
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
    <div className="min-h-screen px-5 py-5 sm:px-10">
      <CurrentPath arrayPath={buildNavRoute()} />
      <div className="mt-5 space-y-5 sm:flex sm:space-x-5 sm:space-y-0">
        <OverviewStatistic />
        <div className="flex flex-col justify-between h-[550px] max-h-[550px] ">
          <SalesByCategory />

          <div className="relative border h-[320px] sm:h-[250px] w-full sm:w-[500px] overflow-hidden rounded-md border-gray-200 shadow-md dark:border-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
