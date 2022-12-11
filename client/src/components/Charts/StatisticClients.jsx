import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatisticClients = ({ data }) => {
  const { user } = useSelector((state) => state.auth);

  const tooltipContent = (data) => {
    const { payload } = data;

    return (
      <>
        {payload?.map((item, i) => (
          <div
            key={i}
            className="p-2 bg-white border border-gray-200 rounded-md shadow-md dark:bg-slate-900 dark:text-white dark:border-gray-600"
          >
            <h4 className="text-xl font-bold dark:text-white">
              {item?.payload?.title}
            </h4>
            <p className="font-light text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                {item?.payload?.tooltipContent}
              </span>
            </p>
          </div>
        ))}
      </>
    );
  };
  return (
    <ResponsiveContainer height="100%">
      <LineChart
        margin={{
          top: 0,
          right: 30,
          left: 30,
          bottom: 0,
        }}
        data={data}
      >
        <CartesianGrid
          stroke={`${
            user?.settings.theme === 1 ? "rgb(229 231 235)" : "rgb(55 65 81)"
          }`}
          vertical={false}
        />
        <XAxis tick={{ fontSize: 12 }} interval={2} dataKey="name" />

        <Tooltip content={tooltipContent} />

        <Line
          dot={false}
          type="monotone"
          dataKey="value"
          stroke={`${user?.settings.theme === 1 ? "#000" : "#ccc"}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatisticClients;
