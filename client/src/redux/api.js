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
 * * My warehouse
 */
export const getMyWarehouse = (id) => API.get(`/getMyWarehouse/${id}`);
export const addProduct = (_id, productData) =>
  API.post(`/warehouse/addProduct/${_id}`, productData);
export const editProduct = (_id, productData) =>
  API.put(`/warehouse/editProduct/${_id}`, productData);
export const deleteProduct = (_id, formData) =>
  API.put(`/warehouse/deleteProduct/${_id}`, formData);

/**
 * * Get my warehouse
 */
export const getCategories = () => API.get(`/getCategories`);

export default API;
