import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { toast } from "react-toastify";

const initialState = {
  productsSelled: [],
  statisticClients: [],
  statisticProducts: [],
  isError: false,
  isSuccess: false,
  productsSelledLoading: false,
  overviewLoading: false,
  message: "",
};

/**
 * * Utils functions
 */
const getHoursArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setHours(dt.getHours() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};
const getDaysArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt < new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  arr.push(new Date(end));

  return arr;
};
const getMonthArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt < new Date(end);
    dt.setMonth(dt.getMonth() + 1)
  ) {
    arr.push(new Date(dt));
  }
  arr.push(new Date(end));
  return arr;
};
const groupProducts = (data) => {
  try {
    const allProducts = [];
    for (let i = 0; i < data.length; i++) {
      allProducts.push(data[i].products);
    }
    return allProducts;
  } catch (error) {
    console.log(error);
  }
};
function groupById(list) {
  try {
    const sum = list.reduce(function (acc, curr) {
      const newAcc = [...acc];
      const newCurr = { ...curr };
      const findIndex = newAcc.findIndex(
        (item) => item.category === newCurr.category
      );

      if (findIndex === -1) {
        newAcc.push(newCurr);
      } else {
        newAcc[findIndex].quantity += newCurr.quantity;
      }
      return newAcc;
    }, []);

    return sum;
  } catch (error) {
    console.log(error);
  }
}
const buildStatistics = (rawData, categories) => {
  try {
    const dataToSend = [];
    for (let i = 0; i < rawData.length; i++) {
      const objIndex = categories.findIndex(
        (obj) => obj._id === rawData[i].category
      );
      const obj = {};
      obj.name = categories[objIndex].name;
      obj.value = rawData[i].quantity;
      dataToSend.push(obj);
    }
    return dataToSend;
  } catch (error) {
    console.log(error);
  }
};
const buildClientsStatistics = (
  rawData,
  rawDataToCompare,
  type,
  firstDate,
  finalDate
) => {
  let data = [];
  let finalData = [];
  let datesArray = [];

  let result = rawData.reduce(function (acc, curr) {
    let isElemExist = acc.findIndex(function (item) {
      return item.customerId === curr._id.customerId;
    });
    if (isElemExist === -1) {
      let obj = {};
      obj.count = 1;
      obj.customerId = curr._id.customerId;
      acc.push(obj);
    } else {
      acc[isElemExist].count += 1;
    }
    return acc;
  }, []);

  let resultToCompare = rawDataToCompare.reduce(function (acc, curr) {
    let isElemExist = acc.findIndex(function (item) {
      return item.customerId === curr._id.customerId;
    });
    if (isElemExist === -1) {
      let obj = {};
      obj.count = 1;
      obj.customerId = curr._id.customerId;
      acc.push(obj);
    } else {
      acc[isElemExist].count += 1;
    }
    return acc;
  }, []);

  let grow = (
    ((result.length - resultToCompare.length) / resultToCompare.length) *
    100
  ).toFixed(0);

  if (grow === "Infinity" || grow === Infinity || grow === "0" || isNaN(grow)) {
    grow = 0;
  }

  finalData.push(result.length, grow);

  switch (type) {
    case 1:
      datesArray = getMonthArray(firstDate, finalDate);
      for (let i = 0; i < datesArray.length; i++) {
        const month = datesArray[i].toLocaleString("en-US", { month: "short" });

        let dataToPush = {};

        let con = 0;
        for (let j = 0; j < rawData.length; j++) {
          if (
            rawData[j]._id.year === datesArray[i].getFullYear() &&
            rawData[j]._id.month === datesArray[i].getMonth() + 1
          ) {
            con++;
          }
        }

        dataToPush.name = `${month} ${datesArray[i].getFullYear()}`;
        dataToPush.value = con;
        dataToPush.title = dataToPush.name;
        dataToPush.tooltipContent = `No. clients: ${con}`;

        data.push(dataToPush);
      }
      break;
    case 2:
      datesArray = getDaysArray(firstDate, finalDate);

      for (let i = 0; i < datesArray.length; i++) {
        const month = datesArray[i].toLocaleString("en-US", { month: "short" });
        let dataToPush = {};

        let con = 0;
        for (let j = 0; j < rawData.length; j++) {
          if (
            rawData[j]._id.day === datesArray[i].getDate() &&
            rawData[j]._id.month === datesArray[i].getMonth() + 1
          ) {
            con++;
          }
        }

        dataToPush.name = `${datesArray[i].getDate()} ${month}`;
        dataToPush.value = con;
        dataToPush.title = dataToPush.name;
        dataToPush.tooltipContent = `No. clients: ${con}`;

        data.push(dataToPush);
      }

      break;
    case 3:
      datesArray = getDaysArray(firstDate, finalDate);
      for (let i = 0; i < datesArray.length; i++) {
        const month = datesArray[i].toLocaleString("en-US", { month: "short" });

        let dataToPush = {};

        let con = 0;
        for (let j = 0; j < rawData.length; j++) {
          if (
            rawData[j]._id.year === datesArray[i].getFullYear() &&
            rawData[j]._id.month === datesArray[i].getMonth() + 1 &&
            rawData[j]._id.day === datesArray[i].getDate()
          ) {
            con++;
          }
        }

        dataToPush.name = `${datesArray[i].getDate()}${month}`;
        dataToPush.value = con;
        dataToPush.title = dataToPush.name;
        dataToPush.tooltipContent = `No. clients: ${con}`;

        data.push(dataToPush);
      }
      break;
    case 4:
      datesArray = getHoursArray(firstDate, finalDate);
      for (let i = 0; i < datesArray.length; i++) {
        const month = datesArray[i].toLocaleString("en-US", {
          month: "short",
        });
        let dataToPush = {};

        let con = 0;
        for (let j = 0; j < rawData.length; j++) {
          if (
            new Date(rawData[j]._id.fullDate).getHours() ===
              datesArray[i].getHours() &&
            rawData[j]._id.day === datesArray[i].getDate()
          ) {
            con++;
          }
        }

        dataToPush.name = `${datesArray[i].getHours()}:00`;
        dataToPush.value = con;
        dataToPush.title =
          dataToPush.name + ` ${datesArray[i].getDate()} ${month}`;

        dataToPush.tooltipContent = `No. clients: ${con}`;

        data.push(dataToPush);
      }
      break;

    default:
      break;
  }
  finalData.push(data);

  return finalData;
};
const buildProductsStatistics = (
  rawData,
  rawDataToCompare,
  type,
  firstDate,
  finalDate
) => {
  let data = [];
  let finalData = [];
  let datesArray = [];

  try {
    const totalProducts = rawData.reduce((accumulator, object) => {
      return accumulator + object.count;
    }, 0);
    const totalProductsCompare = rawDataToCompare.reduce(
      (accumulator, object) => {
        return accumulator + object.count;
      },
      0
    );

    let grow = (
      ((totalProducts - totalProductsCompare) / totalProductsCompare) *
      100
    ).toFixed(0);

    if (
      grow === "Infinity" ||
      grow === Infinity ||
      grow === "0" ||
      isNaN(grow)
    ) {
      grow = 0;
    }

    finalData.push(totalProducts, grow);

    switch (type) {
      case 1:
        datesArray = getMonthArray(firstDate, finalDate);

        for (let i = 0; i < datesArray.length; i++) {
          const month = datesArray[i].toLocaleString("en-US", {
            month: "short",
          });

          let dataToPush = {};

          let con = 0;
          for (let j = 0; j < rawData.length; j++) {
            if (
              rawData[j]._id.year === datesArray[i].getFullYear() &&
              rawData[j]._id.month === datesArray[i].getMonth() + 1
            ) {
              con = rawData[j].count;
            }
          }

          dataToPush.name = `${month} ${datesArray[i].getFullYear()}`;
          dataToPush.value = con;
          dataToPush.title = dataToPush.name;
          dataToPush.tooltipContent = `No. products sold: ${con}`;

          data.push(dataToPush);
        }
        break;
      case 2:
        datesArray = getDaysArray(firstDate, finalDate);

        for (let i = 0; i < datesArray.length; i++) {
          const month = datesArray[i].toLocaleString("en-US", {
            month: "short",
          });
          let dataToPush = {};

          let con = 0;
          for (let j = 0; j < rawData.length; j++) {
            if (
              rawData[j]._id.day === datesArray[i].getDate() &&
              rawData[j]._id.month === datesArray[i].getMonth() + 1
            ) {
              con += rawData[j].count;
            }
          }

          dataToPush.name = `${datesArray[i].getDate()} ${month}`;
          dataToPush.value = con;
          dataToPush.title = dataToPush.name;
          dataToPush.tooltipContent = `No. products sold: ${con}`;

          data.push(dataToPush);
        }

        break;
      case 3:
        datesArray = getDaysArray(firstDate, finalDate);
        for (let i = 0; i < datesArray.length; i++) {
          const month = datesArray[i].toLocaleString("en-US", {
            month: "short",
          });

          let dataToPush = {};

          let con = 0;
          for (let j = 0; j < rawData.length; j++) {
            if (
              rawData[j]._id.year === datesArray[i].getFullYear() &&
              rawData[j]._id.month === datesArray[i].getMonth() + 1 &&
              rawData[j]._id.day === datesArray[i].getDate()
            ) {
              con += rawData[j].count;
            }
          }

          dataToPush.name = `${datesArray[i].getDate()}${month}`;
          dataToPush.value = con;
          dataToPush.title = dataToPush.name;
          dataToPush.tooltipContent = `No. products sold: ${con}`;

          data.push(dataToPush);
        }
        break;
      case 4:
        datesArray = getHoursArray(firstDate, finalDate);
        for (let i = 0; i < datesArray.length; i++) {
          const month = datesArray[i].toLocaleString("en-US", {
            month: "short",
          });
          let dataToPush = {};

          let con = 0;
          for (let j = 0; j < rawData.length; j++) {
            if (
              new Date(rawData[j]._id.fullDate).getHours() ===
                datesArray[i].getHours() &&
              rawData[j]._id.day === datesArray[i].getDate()
            ) {
              con += rawData[j].count;
            }
          }

          dataToPush.name = `${datesArray[i].getHours()}:00`;
          dataToPush.value = con;
          dataToPush.title =
            dataToPush.name + ` ${datesArray[i].getDate()} ${month}`;
          dataToPush.tooltipContent = `No. products sold: ${con}`;

          data.push(dataToPush);
        }
        break;

      default:
        break;
    }

    finalData.push(data);
    return finalData;
  } catch (error) {
    console.log(error);
  }
};

/**
 * * setProductsSelledStatistic
 */
export const setProductsSelledStatistic = createAsyncThunk(
  "/setProductsSelledStatistic",
  async (data, { rejectWithValue }) => {
    try {
      const orders = await api.getOrdersByDate(data);
      const categories = await api.getCategories();
      const response = buildStatistics(
        groupById(groupProducts(orders.data)),
        categories.data
      );
      return response;
    } catch (error) {
      switch (error.code) {
        case "ERR_NETWORK":
          toast.error("An error occurrend!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          break;
        default:
          break;
      }
      const message = error.response
        ? error.response.data.message
        : error.message;

      return rejectWithValue(message);
    }
  }
);

/**
 * * getClientsStatistic
 */
export const getClientsStatistic = createAsyncThunk(
  "/getClientsStatistic",
  async (data, { rejectWithValue }) => {
    try {
      const clientsStatistic = await api.getClientsStatistic(data);

      return buildClientsStatistics(
        clientsStatistic.data[0],
        clientsStatistic.data[1],
        data?.type,
        data.firstDate,
        data.finalDate
      );
    } catch (error) {
      switch (error.code) {
        case "ERR_NETWORK":
          toast.error("An error occurrend!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          break;
        default:
          break;
      }
      const message = error.response
        ? error.response.data.message
        : error.message;

      return rejectWithValue(message);
    }
  }
);

/**
 * * getProductsStatistic
 */
export const getProductsStatistic = createAsyncThunk(
  "/getProductsStatistic",
  async (data, { rejectWithValue }) => {
    try {
      const productsStatistic = await api.getProductsStatistic(data);
      return buildProductsStatistics(
        productsStatistic.data[0],
        productsStatistic.data[1],
        data?.type,
        data.firstDate,
        data.finalDate
      );
    } catch (error) {
      switch (error.code) {
        case "ERR_NETWORK":
          toast.error("An error occurrend!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          break;
        default:
          break;
      }
      const message = error.response
        ? error.response.data.message
        : error.message;

      return rejectWithValue(message);
    }
  }
);

export const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    resetAll: () => initialState,
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetMsg: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProductsSelledStatistic.pending, (state, _) => {
        state.productsSelledLoading = true;
      })
      .addCase(setProductsSelledStatistic.fulfilled, (state, action) => {
        state.productsSelledLoading = false;
        state.productsSelled = action.payload;
      })
      .addCase(setProductsSelledStatistic.rejected, (state, action) => {
        state.productsSelledLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClientsStatistic.pending, (state, _) => {
        state.overviewLoading = true;
      })
      .addCase(getClientsStatistic.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.statisticClients = action.payload;
        state.isSuccess = true;
      })
      .addCase(getClientsStatistic.rejected, (state, action) => {
        state.overviewLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductsStatistic.pending, (state, _) => {
        state.overviewLoading = true;
      })
      .addCase(getProductsStatistic.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.statisticProducts = action.payload;
        state.isSuccess = true;
      })
      .addCase(getProductsStatistic.rejected, (state, action) => {
        state.overviewLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll, resetMsg } = statisticSlice.actions;
export default statisticSlice.reducer;
