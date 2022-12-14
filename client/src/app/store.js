import { configureStore } from "@reduxjs/toolkit";
import sidenavReducer from "../redux/sidenavSlice";
import authReducer from "../redux/authSlice";
import warehouseReducer from "../redux/warehouseSlice";
import categorieReducer from "../redux/categoriesSlice";
import storeReducer from "../redux/storeSlice";
import orderReducer from "../redux/orderSlice";
import statisticReducer from "../redux/statisticSlice";
import inputSearchReducer from "../redux/inputSearchSlice";

export const store = configureStore({
  reducer: {
    sidenavState: sidenavReducer,
    auth: authReducer,
    warehouse: warehouseReducer,
    categories: categorieReducer,
    store: storeReducer,
    order: orderReducer,
    statistic: statisticReducer,
    inputSearch: inputSearchReducer,
  },
});
