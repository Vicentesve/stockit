import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablePrueba from "../components/Table/TablePrueba";
import TableSkeleton from "../components/TableSkeleton";
import { setSubSideNav } from "../redux/sidenavSlice";
import {
  getMyOrdersFromWarehouse,
  putOrderStatus,
} from "../redux/warehouseSlice";
import CurrentPath from "./../components/CurrentPath";

const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myOrdersFromWarehouse = useSelector(
    (state) => state.warehouse.myOrdersFromWarehouse
  );
  const isLoading = useSelector((state) => state.warehouse.isLoading);

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

  const columns = React.useMemo(
    () => [
      { label: "No. Order", value: "_id", type: "text", width: "w-[15%]" },
      {
        label: "Order Date",
        value: "order_date",
        type: "date",
        width: "w-[25%]",
      },
      {
        label: "Status",
        value: "status",
        type: "status",
        width: "w-[25%]",
        options: [
          {
            _id: 0,
            label: "Order placed",
            style:
              "statusOrder bg-cyan-200 hover:bg-cyan-100 border-cyan-300 dark:bg-cyan-300 dark:hover:bg-cyan-200 dark:border-cyan-400",
          },
          {
            _id: 1,
            label: "Order confirmed",
            style:
              "statusOrder bg-amber-200 hover:bg-amber-100 border-amber-300 w-fit dark:bg-amber-300 dark:hover:bg-amber-200 dark:border-amber-400",
          },
          {
            _id: 2,
            label: "Order processed",
            style:
              "statusOrder bg-orange-200 hover:bg-orange-100 border-orange-300 w-fit dark:bg-orange-300 dark:hover:bg-orange-200 dark:border-orange-400",
          },
          {
            _id: 3,
            label: "Order completed",
            style:
              "statusOrder bg-green-200 hover:bg-green-100 border-green-300 w-fit dark:bg-green-300 dark:hover:bg-green-200 dark:border-green-400",
          },
        ],
        handleSubmit: (e) => {
          dispatch(putOrderStatus(e));
        },
      },
      {
        label: "Quantity of products",
        value: "quantity",
        type: "number",
        width: "w-[20%]",
      },
      { label: "Total", value: "total", type: "price", width: "w-[20%]" },
    ],
    [dispatch]
  );

  const headersCSV = [
    { label: "No. Order", key: "_id" },
    {
      label: "Order Date",
      key: "order_date",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Quantity of products",
      key: "quantity",
    },
    { label: "Total", key: "total" },
  ];

  const handleTableRows = () => {
    const data = myOrdersFromWarehouse.map((item) => ({
      _id: item._id,
      order_date: item.order_date,
      status: item.status,
      usuario: item.usuario,
      quantity: item.quantity,
      total: item.total,
    }));
    return data;
  };

  const dataSkeleton = [
    {
      _id: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      order_date: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      status: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      quantity: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
      total: (
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getMyOrdersFromWarehouse(user?._id));
  }, [user?._id, dispatch]);

  return (
    <div className="flex flex-col w-full min-h-screen p-3 md:py-5 md:px-10 dark:bg-gray-800">
      <CurrentPath arrayPath={buildNavRoute()} />

      {isLoading ? (
        <TableSkeleton columns={columns} data={dataSkeleton} />
      ) : (
        <TablePrueba
          columns={columns}
          data={myOrdersFromWarehouse}
          itemsPerPage={10}
          dataSkeleton={dataSkeleton}
          filename="Orders_CVS"
          headersCSV={headersCSV}
          dataCSV={handleTableRows()}
        />
      )}
    </div>
  );
};

export default Orders;
