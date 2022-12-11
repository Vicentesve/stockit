import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { toast } from "react-toastify";

const initialState = {
  warehouses: [],
  currentCategory: 0,
  products: [],
  cart: [],
  cartSize: 0,
  total: 0.0,
  myAddresses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * * getProductsBySearch
 */
export const getProductsBySearch = createAsyncThunk(
  "/getProductsBySearch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getProductsBySearch(data);

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
 * * getProductsByCategory
 */
export const getProductsByCategory = createAsyncThunk(
  "/getProductsByCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProductsByCategory(id);

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
 * * getProductsByWarehouse
 */
export const getProductsByWarehouse = createAsyncThunk(
  "/getProductsByWarehouse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProductsByWarehouse(id);

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
 * * GetWarehousesPreview
 */
export const getWarehousesPreview = createAsyncThunk(
  "/getWarehousesPreview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getWarehousesPreview(id);

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
 * * setAddress
 */
export const setAddress = createAsyncThunk(
  "/setAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.setAddress(formData);

      toast.success("Successful operation!", "", "success", {
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
 * * setAddress
 */
export const getMyAddresses = createAsyncThunk(
  "/getMyAddresses",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getMyAddresses(id);

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

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    resetAll: () => initialState,
    resetProducts: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.products = [];
    },
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetAddresses: (state) => {
      state.myAddresses = [];
    },
    resetMsg: (state) => {
      state.message = "";
    },
    changeCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    addToCart: (state, action) => {
      const objIndex = state.cart.findIndex(
        (obj) => obj._id === action.payload?._id
      );

      const dataToAdd = { ...action.payload };
      if (objIndex === -1) {
        dataToAdd.quantity = 1;
        state.cart.push(dataToAdd);
      } else {
        state.cart[objIndex].quantity++;
      }
      state.total += parseFloat(action.payload.price.$numberDecimal);
      state.cartSize++;
    },
    removeOneToCart: (state, action) => {
      const objIndex = state.cart.findIndex(
        (obj) => obj._id === action.payload
      );

      const dataToAdd = [...state.cart];

      if (objIndex > -1) {
        dataToAdd[objIndex].quantity--;
        state.cart = dataToAdd;
      }
      state.total -= parseFloat(dataToAdd[objIndex].price.$numberDecimal);
      state.cartSize--;
    },
    addOneToCart: (state, action) => {
      const objIndex = state.cart.findIndex(
        (obj) => obj._id === action.payload
      );

      const dataToAdd = [...state.cart];

      if (objIndex > -1) {
        dataToAdd[objIndex].quantity++;
        state.cart = dataToAdd;
      }
      state.total += parseFloat(dataToAdd[objIndex].price.$numberDecimal);
      state.cartSize++;
    },
    addManyToCart: (state, action) => {
      const objIndex = state.cart.findIndex(
        (obj) => obj._id === action.payload.id
      );

      if (objIndex > -1) {
        state.total -=
          state.cart[objIndex].quantity *
          parseFloat(state.cart[objIndex].price.$numberDecimal);
        state.total +=
          parseFloat(state.cart[objIndex].price.$numberDecimal) *
          action.payload.quantity;

        state.cart[objIndex].quantity = action.payload.quantity;
      }
    },
    removeProductFromCart: (state, action) => {
      const objIndex = state.cart.findIndex(
        (obj) => obj._id === action.payload
      );

      const newCart = [...state.cart];

      if (objIndex >= 0) {
        state.cartSize -= newCart[objIndex].quantity;
        state.total -=
          parseFloat(newCart[objIndex].price.$numberDecimal) *
          newCart[objIndex].quantity;
        newCart.splice(objIndex, 1);
        state.cart = newCart;
      } else {
        console.warn(`Cant remove product (id ${action.payload.id})`);
      }
    },
    incrementByAmount: (state, action) => {
      state.cartSize += action.payload;
    },
    dicrementByAmount: (state, action) => {
      state.cartSize -= action.payload;
    },
    removeAllFromCart: (state, _) => {
      state.cart = [];
      state.cartSize = 0;
      state.total = 0.0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWarehousesPreview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWarehousesPreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.warehouses = action.payload;
      })
      .addCase(getWarehousesPreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.warehouses = null;
      })
      .addCase(getProductsByCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = null;
      })
      .addCase(getProductsByWarehouse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductsByWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductsByWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = null;
      })
      .addCase(getProductsBySearch.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductsBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = null;
      })
      .addCase(setAddress.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(setAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myAddresses.push(action.payload);
      })
      .addCase(setAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyAddresses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMyAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myAddresses = action.payload;
      })
      .addCase(getMyAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  reset,
  resetAll,
  resetProducts,
  resetMsg,
  changeCategory,
  addToCart,
  incrementByAmount,
  dicrementByAmount,
  addManyToCart,
  removeProductFromCart,
  removeOneToCart,
  addOneToCart,
  removeAllFromCart,
  resetAddresses,
} = storeSlice.actions;
export default storeSlice.reducer;
