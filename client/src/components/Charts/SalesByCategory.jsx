import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { setProductsSelledStatistic } from "../../redux/statisticSlice";

const SalesByCategory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const productsSelled = useSelector((state) => state.statistic.productsSelled);
  const productsSelledLoading = useSelector(
    (state) => state.statistic.productsSelledLoading
  );

  const currentDate = new Date();
  /**
   * * Variables for the select
   */
  const buildSelectYear = () => {
    const years = [];
    let currentYear = currentDate.getFullYear();
    for (let i = 0; i < 20; i++) {
      years.push(currentYear);
      currentYear -= 1;
    }

    return years;
  };
  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const generateRandomColor = () => {
    const maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    const randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };

  const legendContent = (data) => {
    return (
      <div
        className={`grid grid-cols-2 text-xs text-center animate-in fade-in duration-1000
      sm:text-base sm:block sm:mr-10 place-items-center whitespace-nowrap`}
      >
        {data.payload.map((item, i) => (
          <div
            key={i}
            className="flex justify-between space-x-2 w-fit sm:w-full sm:space-x-10"
          >
            <div
              style={{ color: item?.color }}
              className={`flex items-center space-x-1`}
            >
              <span
                style={{ backgroundColor: item?.color }}
                className="w-2 h-2 rounded-full"
              />
              <p>{item.value}</p>
            </div>
            <p className="font-semibold dark:text-white">
              {(parseFloat(item.payload.percent).toFixed(2) * 100).toFixed(0)}%
            </p>
          </div>
        ))}
      </div>
    );
  };

  const tooltipContent = (data) => {
    const { payload } = data;

    return (
      <>
        {payload?.map((item, i) => (
          <div
            key={i}
            className="p-2 bg-white border border-gray-200 rounded-md shadow-md dark:bg-slate-900 dark:text-white dark:border-gray-600"
          >
            <h4 className="text-xl font-bold dark:text-white">{item.name}</h4>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Amount of products sold:{" "}
              <span className="font-semibold">{item.value}</span>
            </p>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    const filters = {
      id: user?._id,
      year,
      month,
    };
    dispatch(setProductsSelledStatistic(filters));
  }, [dispatch, year, month, user?._id]);

  /**
   * * Window Size: state, effect & function *
   */
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <div className="relative border h-[320px] sm:h-[250px] w-full sm:w-[500px] overflow-hidden rounded-md border-gray-200 shadow-md dark:border-gray-700">
      <div className="absolute flex flex-col items-center w-full p-5 h-fit sm:justify-between whitespace-nowrap sm:flex-row">
        <h3 className="text-xl font-bold dark:text-white">Sales by category</h3>

        {/* Select */}
        <div className="flex w-[200px] h-fit mt-1 sm:mt-0">
          <label htmlFor="year" className="sr-only">
            Choose a year
          </label>
          <select
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="z-10 items-center py-1 text-sm font-medium text-left text-gray-500 bg-gray-100 border border-gray-300 rounded-l-md hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          >
            {buildSelectYear()?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label htmlFor="month" className="sr-only">
            Choose a month
          </label>
          <select
            id="month"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="z-10 block w-full p-1 text-sm text-gray-900 border border-l-2 border-gray-300 rounded-r-md bg-gray-50 border-l-gray-100 dark:border-l-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {months?.map((month) => (
              <option key={month.value} value={month.value}>
                {currentDate.getMonth() + 1 === month.value
                  ? "This month"
                  : month.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {productsSelledLoading ? (
        <div className="flex items-center justify-center h-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : productsSelled.length > 0 ? (
        <div className="relative w-full h-full mt-5">
          <ResponsiveContainer height="100%" width="100%">
            <PieChart
              margin={{
                top: windowSize.innerWidth > 640 ? 0 : 85,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <Tooltip content={tooltipContent} />
              <Legend
                content={legendContent}
                layout={windowSize.innerWidth > 640 ? "vertical" : "horizontal"}
                verticalAlign={
                  windowSize.innerWidth > 640 ? "middle" : "bottom"
                }
                align={windowSize.innerWidth > 640 ? "right" : "center"}
                iconType="circle"
              />
              <Pie
                data={productsSelled}
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                animationDuration={600}
              >
                {productsSelled?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mt-3">
          <img
            className="object-contain h-[100px]"
            src="/images/no-stats.svg"
            alt=""
          />
          <p className="mt-5 font-semibold text-gray-500 dark:text-gray-400">
            No data for this date😢
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(SalesByCategory);
