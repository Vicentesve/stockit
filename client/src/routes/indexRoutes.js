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
import Checkout from "../pages/store/Checkout";
import Dashboard from "../pages/Dashboard";
import SearchPage from "../pages/store/SearchPage";
import ProductDetails from "../pages/store/ProductDetails";
import Orders from "../pages/store/Orders";
import MyAccount from "../pages/store/MyAccount";
import MyAddresses from "../pages/store/MyAddresses";
import NewDirection from "../pages/store/NewDirection";

const routes = [
  {
    path: "/",
    element: <LandingPageStore />,
    children: [
      { index: true, element: <Home /> },
      { path: "category/:id", element: <CategoryPage /> },
      { path: "warehouse/:id", element: <WarehousePage /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "search/:categoryId/:search", element: <SearchPage /> },
      { path: "cart", element: <Cart /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "my-account/my-addresses", element: <MyAddresses /> },
      {
        path: "my-account/my-addresses/new-address",
        element: <NewDirection />,
      },
      { path: "orders", element: <Orders /> },
    ],
  },
  { path: "/checkout", element: <Checkout /> },
  {
    path: "/my-warehouse",
    element: <LandingPage />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "dashboard", element: <Dashboard /> },
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
