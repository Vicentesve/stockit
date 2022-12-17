import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/credit_card_preview.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "flowbite";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import "react-credit-cards-2/es/styles-compiled.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
