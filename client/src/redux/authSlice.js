import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";
import { toast } from "react-toastify";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("stockit-user"));

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * * Login User
 */
export const login = createAsyncThunk(
  "/login",
  async ({ data, setError }, { rejectWithValue }) => {
    try {
      const response = await api.login(data);

      if (response.data) {
        localStorage.setItem("stockit-user", JSON.stringify(response.data));
      }

      toast.success(`Welcome back, ${response.data.name}!`, {
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
            autoClose: 5000,
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

      Object.keys(message).forEach((key) => {
        if (message[key] !== "") {
          setError(key, {
            type: "server",
            message: message[key],
          });
        }
      });

      return rejectWithValue(message);
    }
  }
);

/**
 * * Signup User
 */
export const signup = createAsyncThunk(
  "/signup",
  async ({ data, setError }, { rejectWithValue }) => {
    try {
      const response = await api.signup(data);

      if (response.data) {
        localStorage.setItem("stockit-user", JSON.stringify(response.data));
      }

      toast.success("¡Welcome to StockIt!", "", "success", {
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
            autoClose: 5000,
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

      Object.keys(message).forEach((key) => {
        setError(key, {
          type: "server",
          message: message[key],
        });
      });

      return rejectWithValue(message);
    }
  }
);

/**
 * * Update Me
 */
export const updateMe = createAsyncThunk(
  "/updateMe",
  async ({ data, setError, handleClear }, { rejectWithValue }) => {
    try {
      const response = await api.updateMe(data.id, data);

      if (response.data) {
        localStorage.setItem("stockit-user", JSON.stringify(response.data));
        toast.success(`Operation carried out successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        if (handleClear) handleClear(); //Reset the fields
      }

      return response.data;
    } catch (error) {
      switch (error.code) {
        case "ERR_NETWORK":
          toast.error("An error occurrend!", {
            position: "top-right",
            autoClose: 5000,
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

      switch (data?.type) {
        case "account":
          delete message.user;
          delete message.password;
          delete message.currentPassword;
          break;
        case "security":
          delete message.email;
          delete message.user;
          delete message.password;
          break;

        default:
          break;
      }

      Object.keys(message).forEach((key) => {
        setError(key, {
          type: "server",
          message: message[key],
        });
      });

      return rejectWithValue(message);
    }
  }
);

/**
 * * Logout User
 */
export const logout = createAsyncThunk("/logout", () => {
  api.logout();
});

export const authSlice = createSlice({
  name: "auth",
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
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetAll, resetMsg, setLogout } = authSlice.actions;
export default authSlice.reducer;
