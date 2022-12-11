import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientsStatistic,
  getProductsStatistic,
} from "../../redux/statisticSlice";
import OverviewCard from "./OverviewCard";
import StatisticClients from "./StatisticClients";

const OverviewStatistic = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const statisticClients = useSelector(
    (state) => state.statistic.statisticClients
  );
  const statisticProducts = useSelector(
    (state) => state.statistic.statisticProducts
  );
  const overviewLoading = useSelector(
    (state) => state.statistic.overviewLoading
  );

  let today = new Date();
  let date = new Date();
  const [filter, setFilter] = useState({
    id: user?._id,
    type: 1,
    firstDate: new Date(date.setDate(date.getDate() - 364)),
    finalDate: today,
  });
  const onChange = (e) => {
    today = new Date();
    date = new Date();
    let finalDate;
    switch (e.target.name) {
      case "year":
        // finalDate = new Date(date.setFullYear(date.getFullYear() - 1));
        finalDate = new Date(date.setDate(date.getDate() - 364));

        setFilter({
          ...filter,
          type: 1,
          firstDate: finalDate,
          finalDate: today,
        });

        break;
      case "month":
        // finalDate = new Date(date.setMonth(date.getMonth() - 1));
        finalDate = new Date(date.setDate(date.getDate() - 29));

        setFilter({
          ...filter,
          type: 2,
          firstDate: finalDate,
          finalDate: today,
        });
        break;
      case "week":
        finalDate = new Date(date.setDate(date.getDate() - 6));
        const initDay = new Date(today.setDate(today.getDate()));
        setFilter({
          ...filter,
          type: 3,
          firstDate: finalDate,
          finalDate: initDay,
        });
        break;
      case "day":
        // finalDate = new Date(date.setFullYear(date.getFullYear() - 1));
        finalDate = new Date(date.setDate(date.getDate() - 1));

        setFilter({
          ...filter,
          type: 4,
          firstDate: finalDate,
          finalDate: today,
        });
        break;
      default:
        break;
    }
  };

  const [tab, setTab] = useState(0);
  useEffect(() => {
    dispatch(getClientsStatistic(filter));
    dispatch(getProductsStatistic(filter));
  }, [dispatch, filter]);

  return (
    <div className="relative flex flex-col border w-full h-[520px] sm:h-[550px] xl:min-w-[60%] xl:max-w-[60%] 2xl:min-w-[70%] 2xl:max-w-[70%] overflow-hidden rounded-md border-gray-200  shadow-md dark:border-gray-700 p-3">
      <div className="flex justify-between px-[30px]">
        <h3 className="text-xl font-bold dark:text-white">Overview</h3>
        <div className="flex space-x-2 text-gray-400 dark:text-gray-500">
          <button
            name="year"
            onClick={onChange}
            className={` outline-none ${
              filter.type === 1 && "text-black dark:text-white font-semibold"
            }`}
          >
            12m
          </button>
          <button
            name="month"
            onClick={onChange}
            className={` outline-none ${
              filter.type === 2 && "text-black dark:text-white font-semibold"
            }`}
          >
            30d
          </button>
          <button
            name="week"
            onClick={onChange}
            className={` outline-none ${
              filter.type === 3 && "text-black dark:text-white font-semibold"
            }`}
          >
            7d
          </button>
          <button
            name="day"
            onClick={onChange}
            className={` outline-none ${
              filter.type === 4 && "text-black dark:text-white font-semibold"
            }`}
          >
            24h
          </button>
        </div>
      </div>

      <div className="px-[30px] flex space-x-5 overflow-x-scroll">
        <OverviewCard
          title="Clients"
          total={statisticClients[0]}
          grow={statisticClients[1]}
          previewData={statisticClients[2]}
          isLoading={overviewLoading}
          isSelected={tab === 0 ? true : false}
          setIsSelected={setTab}
          value={0}
        />

        <OverviewCard
          title="Products"
          total={statisticProducts[0]}
          grow={statisticProducts[1]}
          previewData={statisticProducts[2]}
          isLoading={overviewLoading}
          isSelected={tab === 1 ? true : false}
          setIsSelected={setTab}
          value={1}
        />
      </div>

      <div className={`relative flex-1 mt-5`}>
        <div className={`w-full h-full ${tab === 0 ? "block" : "hidden"}`}>
          {overviewLoading ? (
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
          ) : (
            <StatisticClients
              data={statisticClients[2]}
              isLoading={overviewLoading}
            />
          )}
        </div>
        <div className={`w-full h-full ${tab === 1 ? "block" : "hidden"}`}>
          {overviewLoading ? (
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
          ) : (
            <StatisticClients
              data={statisticProducts[2]}
              isLoading={overviewLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewStatistic;
