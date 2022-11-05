import { Welcome } from "../components/Welcome";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Warehouse from "../pages/Warehouse";
import settingsRoutes from "./settingsRoutes";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "dashboard", element: <p>Dashboard</p> },
      { path: "orders", element: <p>Orders</p> },
      { path: "warehouse", element: <Warehouse /> },
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
