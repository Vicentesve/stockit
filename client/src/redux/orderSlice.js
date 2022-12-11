import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { toast } from "react-toastify";

const initialState = {
  orders: [],
  myOrdersCustomer: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * * setOrder
 */
export const setOrder = createAsyncThunk(
  "/setOrder",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.setOrder(formData);

      toast.success("Successful purchase!", "", "success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return response.data;
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
 * * getOrders
 */
export const getOrders = createAsyncThunk(
  "/getOrders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getOrdersByDate(data);

      return response.data;
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
 * * getOrders
 */
export const getMyOrders = createAsyncThunk(
  "/getMyOrders",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getMyOrders(data);

      return response.data;
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

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetAll: () => initialState,
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetMsg: (state) => {
      state.message = "";
    },
    resetOrdersCustomer: (state) => {
      state.myOrdersCustomer = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(setOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myOrdersCustomer = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll, resetMsg, resetOrdersCustomer } =
  orderSlice.actions;
export default orderSlice.reducer;
