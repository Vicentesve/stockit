import { Welcome } from "../components/Welcome";
import LandingPage from "../pages/LandingPage";
import LandingPageStore from "../pages/store/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Warehouse from "../pages/Warehouse";
import settingsRoutes from "./settingsRoutes";
import Home from "../pages/store/Home";
import CategoryPage from "../pages/store/CategoryPage";
import WarehousePage from "../pages/store/WarehousePage";
import { Cart } from "../pages/store/Cart";

const routes = [
  {
    path: "/",
    element: <LandingPageStore />,
    children: [
      { index: true, element: <Home /> },
      { path: "category/:id", element: <CategoryPage /> },
      { path: "warehouse/:id", element: <WarehousePage /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/my-warehouse",
    element: <LandingPage />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "dashboard", element: <p>Dashboard</p> },
      { path: "orders", element: <p>Orders</p> },
      { path: "my-products", element: <Warehouse /> },
      settingsRoutes,
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export default routes;
