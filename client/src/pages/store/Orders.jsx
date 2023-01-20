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
            {myOrdersCustomer.length <= 0 ? (
              <>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[300px] mx-auto"
                  viewBox="0 0 800.000000 600.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M4608 5769 c-25 -14 -23 -39 25 -249 l43 -185 35 -3 c23 -2 43 3 57
15 l21 18 -44 193 c-24 107 -46 200 -49 208 -6 16 -62 18 -88 3z"
                    />
                    <path
                      d="M5203 5678 c-6 -7 -54 -88 -107 -181 -78 -135 -95 -171 -87 -186 12
-21 65 -46 84 -38 10 4 134 212 214 359 2 4 -7 19 -21 33 -27 27 -67 33 -83
13z"
                    />
                    <path
                      d="M3345 5366 c-111 -51 -180 -185 -154 -302 l6 -31 -118 -26 c-146 -33
-200 -58 -262 -119 -46 -46 -97 -135 -97 -169 0 -28 -20 -36 -190 -73 -288
-64 -316 -76 -365 -160 -50 -85 -51 -77 124 -845 106 -465 166 -710 177 -722
33 -36 94 -11 94 37 0 11 -32 160 -71 330 -38 170 -94 417 -124 549 -30 132
-68 300 -85 373 -39 173 -39 195 3 237 27 27 48 36 132 55 55 12 144 32 198
45 54 12 99 20 101 16 2 -3 7 -20 10 -38 8 -36 13 -34 -164 -73 -119 -26 -148
-37 -155 -61 -5 -16 672 -3043 708 -3164 8 -28 19 -42 37 -48 31 -10 2266 495
2288 517 8 8 14 25 14 38 0 53 -713 3162 -729 3180 -21 23 -22 23 -190 -14
-78 -17 -145 -29 -148 -27 -2 3 -6 20 -7 39 l-3 34 196 44 c194 45 195 45 233
27 20 -10 43 -30 50 -44 8 -14 55 -208 106 -431 50 -223 96 -410 102 -417 13
-16 70 -17 86 -1 7 7 12 24 12 39 0 29 -173 799 -189 841 -13 35 -68 96 -101
113 -75 39 -104 37 -334 -14 l-217 -49 -41 44 c-22 24 -69 58 -104 75 -91 45
-167 48 -307 15 -60 -14 -114 -26 -121 -26 -6 0 -19 21 -28 48 -54 151 -229
225 -373 158z m155 -96 c57 -16 96 -64 118 -149 11 -40 26 -78 34 -82 22 -14
58 -10 194 21 201 46 255 39 341 -46 54 -53 69 -89 80 -180 5 -47 3 -53 -18
-67 -13 -9 -323 -83 -688 -166 -599 -137 -666 -150 -685 -137 -41 26 -61 191
-32 260 20 48 79 110 123 129 21 9 90 28 153 42 222 50 217 46 192 162 -14 66
-14 75 2 117 18 47 55 82 104 96 37 11 42 11 82 0z m1144 -487 c3 -10 21 -90
41 -178 20 -88 58 -257 85 -375 97 -424 551 -2425 553 -2439 2 -14 -64 -30
-848 -207 -137 -31 -365 -82 -505 -114 -570 -130 -752 -171 -755 -168 -1 2
-66 287 -144 633 -79 347 -167 736 -197 865 -200 879 -333 1469 -336 1494 l-3
30 124 28 123 29 42 -21 c53 -25 102 -25 213 1 48 11 346 79 662 150 316 71
586 136 602 144 15 8 41 32 58 52 29 35 39 40 144 64 139 33 135 33 141 12z"
                    />
                    <path
                      d="M5405 5151 c-111 -26 -209 -50 -218 -54 -34 -13 -15 -107 22 -107 25
0 411 88 439 100 43 19 19 112 -29 109 -8 -1 -104 -22 -214 -48z"
                    />
                    <path
                      d="M5097 4062 c-9 -10 -17 -27 -17 -38 0 -43 42 -190 57 -201 25 -19 57
-16 78 7 18 20 18 24 1 108 -10 48 -23 98 -29 112 -16 32 -66 39 -90 12z"
                    />
                    <path
                      d="M5167 3772 c-10 -10 -17 -30 -17 -44 0 -15 104 -482 230 -1039 127
-557 230 -1031 230 -1052 0 -49 -30 -92 -73 -106 -17 -6 -210 -51 -427 -100
-217 -49 -753 -171 -1190 -270 -437 -100 -806 -181 -820 -181 -36 0 -85 33
-98 66 -6 16 -59 238 -116 494 -86 377 -110 468 -126 482 -35 28 -90 6 -90
-37 0 -29 207 -941 222 -979 28 -70 106 -129 185 -142 29 -4 316 57 1258 271
671 152 1236 283 1255 291 79 33 139 121 140 204 0 25 -106 513 -236 1085
-246 1090 -242 1075 -294 1075 -9 0 -24 -8 -33 -18z"
                    />
                    <path
                      d="M5603 2999 c-6 -6 -9 -18 -6 -25 3 -8 -1 -14 -10 -14 -8 0 -17 -9
-20 -20 -6 -24 2 -60 14 -60 5 0 9 -5 9 -11 0 -20 33 -38 68 -39 42 0 92 46
92 85 0 30 -16 65 -39 82 -20 16 -93 17 -108 2z m75 -48 c8 -4 12 -19 10 -32
-4 -34 -53 -40 -63 -8 -5 16 -2 26 11 36 21 15 24 16 42 4z"
                    />
                    <path
                      d="M2502 2875 c-14 -10 -22 -26 -22 -44 0 -16 36 -187 80 -381 44 -194
80 -354 80 -355 0 -2 7 -11 16 -19 34 -35 94 -9 94 40 0 34 -157 719 -170 744
-6 11 -15 20 -20 20 -4 0 -14 2 -22 5 -7 3 -23 -2 -36 -10z"
                    />
                    <path
                      d="M2497 1553 c-4 -3 -7 -18 -7 -32 0 -18 -9 -31 -31 -43 -24 -14 -28
-21 -20 -35 6 -12 22 -18 43 -18 24 0 33 -4 32 -16 -1 -12 4 -15 20 -11 19 5
20 4 6 -13 -13 -16 -13 -18 0 -13 8 2 17 20 20 39 4 25 11 35 27 37 24 4 35
24 26 48 -4 11 -15 15 -34 12 -19 -3 -29 0 -29 8 0 14 -27 44 -39 44 -4 0 -11
-3 -14 -7z"
                    />
                    <path
                      d="M5116 867 c-21 -15 -25 -62 -7 -80 9 -9 131 -13 451 -15 l439 -3 17
26 c15 23 15 27 1 48 -15 24 -16 24 -303 30 -444 11 -577 9 -598 -6z"
                    />
                    <path
                      d="M2080 821 c-15 -28 -12 -46 8 -64 17 -16 126 -17 1368 -17 1037 0
1353 3 1362 12 15 15 15 61 0 76 -9 9 -327 12 -1370 12 -1332 0 -1357 0 -1368
-19z"
                    />
                    <path
                      d="M2642 278 c-7 -7 -12 -24 -12 -38 0 -14 5 -31 12 -38 9 -9 207 -12
830 -12 l818 0 12 25 c9 19 8 29 -6 50 l-16 25 -813 0 c-619 0 -816 -3 -825
-12z"
                    />
                  </g>
                </svg>
                <p className="text-3xl font-semibold text-center">
                  No orders😢
                </p>
              </>
            ) : (
              <>
                {myOrdersCustomer?.map((order, i) => (
                  <OrderTable
                    orderPlacedOn={order?.createdAt}
                    total={order.total.$numberDecimal}
                    orderId={order?._id}
                    deliveredOn={order?.deliveredOn}
                    products={order?.products}
                    status={order?.status}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
