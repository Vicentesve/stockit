import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { toast } from "react-toastify";

const initialState = {
  warehouse: null,
  myOrdersFromWarehouse: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * * Get my warehouse
 */
export const getMyWarehouse = createAsyncThunk(
  "/getMyWarehouse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getMyWarehouse(id);
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
 * * Add a product for my warehouse
 */
export const addProduct = createAsyncThunk(
  "/warehouse/addProduct",
  async (productData, { rejectWithValue, getState }) => {
    try {
      const { warehouse } = getState();
      const response = await api.addProduct(
        warehouse.warehouse._id,
        productData
      );

      toast.success(`Product ${response.data.name} added succesfully!`, {
        position: "top-right",
        autoClose: 3000,
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
 * * Edit a product for my warehouse
 */
export const editProduct = createAsyncThunk(
  "/warehouse/editProduct",
  async (productData, { rejectWithValue, getState }) => {
    try {
      const { warehouse } = getState();
      const response = await api.editProduct(
        warehouse.warehouse._id,
        productData
      );

      toast.success(`Product ${response.data.name} edited succesfully!`, {
        position: "top-right",
        autoClose: 3000,
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
 * * Delete a product for my warehouse
 */
export const deleteProduct = createAsyncThunk(
  "/warehouse/deleteProduct",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const { warehouse } = getState();
      const response = await api.deleteProduct(
        warehouse.warehouse._id,
        formData
      );

      toast.success(`Product ${response.data.name} deleted succesfully!`, {
        position: "top-right",
        autoClose: 3000,
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
 * * Get my warehouse
 */
export const getMyOrdersFromWarehouse = createAsyncThunk(
  "/getMyOrdersFromWarehouse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getMyOrdersFromWarehouse(id);
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
 * * Put status of warehouse order
 */
export const putOrderStatus = createAsyncThunk(
  "/putOrderStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.putOrderStatus(data);

      toast.success(`Status changed successfully!`, {
        position: "top-right",
        autoClose: 3000,
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

export const warehouseSlice = createSlice({
  name: "warehouse",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyWarehouse.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getMyWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.warehouse = action.payload;
      })
      .addCase(getMyWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editProduct.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        const objIndex = state.warehouse.products.findIndex(
          (obj) => obj._id === action.payload._id
        );
        state.warehouse.products[objIndex] = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.warehouse = null;
      })
      .addCase(addProduct.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.warehouse.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.warehouse = null;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        const objIndex = state.warehouse.products.findIndex(
          (obj) => obj._id === action.payload._id
        );
        if (objIndex > -1) {
          state.warehouse.products.splice(objIndex, 1);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.warehouse = null;
      })
      .addCase(getMyOrdersFromWarehouse.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getMyOrdersFromWarehouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myOrdersFromWarehouse = action.payload;
      })
      .addCase(getMyOrdersFromWarehouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(putOrderStatus.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(putOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const objIndex = state.myOrdersFromWarehouse.findIndex(
          (obj) => obj._id === action.payload.idOrder
        );
        if (objIndex > -1) {
          state.myOrdersFromWarehouse[objIndex].status = action.payload.status;
        }
      })
      .addCase(putOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll, resetMsg } = warehouseSlice.actions;
export default warehouseSlice.reducer;
