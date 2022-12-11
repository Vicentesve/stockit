import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../../components/Store/OrderTable";
import OrderTableSkeleton from "../../components/Store/OrderTableSkeleton";
import { getMyOrders, resetOrdersCustomer } from "../../redux/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myOrdersCustomer = useSelector((state) => state.order.myOrdersCustomer);
  const isLoading = useSelector((state) => state.order.isLoading);

  let today = new Date();
  let date = new Date();
  const [filter, setFilter] = useState({
    id: user?._id,
    date: "last30Days",
    startDate: new Date(date.setDate(date.getDate() - 30)),
    finalDate: today,
  });

  /**
   * * Variables for the select
   */
  const buildSelectYear = () => {
    const years = [];
    let currentYear = date.getFullYear();
    for (let i = 0; i < 5; i++) {
      years.push(currentYear);
      currentYear -= 1;
    }

    return years;
  };
  const onChange = (e) => {
    today = new Date();
    date = new Date();

    switch (e.target.value) {
      case "last30Days":
        setFilter({
          ...filter,
          date: e.target.value,
          startDate: new Date(date.setDate(date.getDate() - 30)),
          finalDate: today,
        });
        break;
      case "last3Months":
        setFilter({
          ...filter,
          date: e.target.value,
          startDate: new Date(date.setMonth(date.getMonth() - 3)),
          finalDate: today,
        });
        break;

      default:
        setFilter({
          ...filter,
          date: e.target.value,
          startDate: new Date(e.target.value, 0, 1),
          finalDate: new Date(e.target.value, 11, 31),
        });
        break;
    }
  };

  useEffect(() => {
    dispatch(getMyOrders(filter));

    return () => {
      dispatch(resetOrdersCustomer());
    };
  }, [dispatch, filter]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-screen-xl p-2 mx-auto bg-white">
        <h3 className="mb-5 text-3xl font-semibold">My Orders</h3>

        <div className="flex items-center w-full my-3 space-x-1 text-sm">
          {isLoading ? (
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 animate-pulse"></div>
          ) : (
            <h3>
              <strong>{myOrdersCustomer.length} orders</strong> placed in
            </h3>
          )}
          <select
            className="py-1 pl-2 pr-6 text-sm text-left rounded-md"
            name="filter"
            id="filter"
            value={filter.date}
            onChange={onChange}
          >
            <option value="last30Days">Last 30 days</option>
            <option value="last3Months">Last 3 months</option>
            {buildSelectYear()?.map((year, i) => (
              <option name="year" key={i} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="space-y-5">
            {[...Array(10)].map((_, i) => (
              <OrderTableSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {myOrdersCustomer?.map((order, i) => (
              <OrderTable
                orderPlacedOn={order?.createdAt}
                total={order.total.$numberDecimal}
                orderId={order?._id}
                deliveredOn={order?.deliveredOn}
                products={order?.products}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
