import { Cog6ToothIcon, KeyIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import SubSidenav from "../components/SubSidenav";
import Account from "../pages/Account";
import Appearance from "../pages/Appearance";
import MyWarehouseInfo from "../pages/MyWarehouseInfo";
import Security from "../pages/Security";

const subSideNavConfiguracion = {
  name: "Settings",
  submenus: [
    { name: "My Warehouse Info", Icon: ArchiveBoxIcon },
    { name: "Account", Icon: Cog6ToothIcon },
    { name: "Security", Icon: KeyIcon },
    { name: "Appearence", Icon: PhotoIcon },
  ],
};

const subRoutesCatalogo = [
  {
    path: "my-warehouse-info",
    index: true,

    element: <MyWarehouseInfo />,
  },
  {
    path: "account",
    element: <Account />,
  },

  {
    path: "security",
    element: <Security />,
  },
  {
    path: "appearence",
    element: <Appearance />,
  },
];

const configuracionRoutes = {
  path: "settings",
  element: <SubSidenav module={subSideNavConfiguracion} />,
  children: subRoutesCatalogo,
};

export default configuracionRoutes;
