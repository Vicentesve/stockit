import axios from "axios";
const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("stockit-user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("stockit-user")).token
    }`;
  }
  return req;
});

/**
 * * Authentification API
 */
export const login = (userData) => API.post("/login", userData);
export const signup = (userData) => API.post("/signup", userData);
export const updateMe = (id, userData) => API.put(`/updateMe/${id}`, userData);
export const logout = () => localStorage.removeItem("stockit-user");

/**
 * * Warehouse
 */
export const getProductById = (id) => API.get(`/getProductById/${id}`);
export const getProductsBySearch = (data) =>
  API.get(`/getProductsBySearch/${data?.categoryId}/${data?.search}`);
export const getProductsByWarehouse = (id) =>
  API.get(`/getProductsByWarehouse/${id}`);
export const getProductsByCategory = (id) =>
  API.get(`/getProductsByCategory/${id}`);
export const getWarehousesPreview = () => API.get("/getWarehousesPreview");
export const getMyWarehouse = (id) => API.get(`/getMyWarehouse/${id}`);
export const getMyWarehouseId = (id) => API.get(`/getMyWarehouseId/${id}`);
export const addProduct = (_id, productData) =>
  API.post(`/warehouse/addProduct/${_id}`, productData);
export const editProduct = (_id, productData) =>
  API.put(`/warehouse/editProduct/${_id}`, productData);
export const deleteProduct = (_id, formData) =>
  API.put(`/warehouse/deleteProduct/${_id}`, formData);

/**
 * * Categories
 */
export const getCategories = () => API.get(`/getCategories`);

/**
 * * Orders
 */
export const setOrder = (formData) => API.put("/setOrder", formData);
export const getOrdersByDate = (data) =>
  API.get(`/getOrders/${data.id}/${data.year}/${data.month}`);
export const getMyOrders = (data) =>
  API.get(`/getMyOrders/${data.id}/${data.startDate}/${data.finalDate}`);

/**
 * * Statistic
 */
export const getClientsStatistic = (data) =>
  API.get(
    `/getClientsStatistic/${data.id}/${data.type}/${data.firstDate}/${data.finalDate}`
  );
export const getProductsStatistic = (data) =>
  API.get(
    `/getProductsStatistic/${data.id}/${data.type}/${data.firstDate}/${data.finalDate}`
  );

/**
 * * Countries
 */
export const getAllCountries = () =>
  API.get("https://restcountries.com/v3.1/all");

/**
 * * Addresses
 */
export const getMyAddresses = (id) => API.get(`/getMyAddresses/${id}`);
export const setAddress = (formData) => API.post("/setAddress", formData);
export const editAddress = (formData) =>
  API.put(`/editAddress/${formData._id}`, formData);

/**
 * * Payments
 */
export const getMyPayments = (id) => API.get(`/getMyPayments/${id}`);
export const setPayment = (formData) => API.post("/setPayment", formData);
export const editPayment = (formData) =>
  API.put(`/editPayment/${formData._id}`, formData);

export default API;
