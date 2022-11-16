import React from "react";
import {
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  ClipboardIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import NavLinkToolTip from "./Inputs/NavLinkToolTip";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { setSubSideNav } from "../redux/sidenavSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const modules = [
    { name: "Dashboard", icon: Squares2X2Icon, url: "/my-warehouse/dashboard" },
    { name: "Orders", icon: ClipboardIcon, url: "/my-warehouse/orders" },
    {
      name: "Warehouse",
      icon: ArchiveBoxIcon,
      url: "/my-warehouse/my-products",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const onClickSettings = () => {
    dispatch(setSubSideNav(true));
  };

  return (
    <aside className="overflow-y-scroll md:overflow-hidden z-[90] overflow-x-hidden min-h-screen bg-cyan-50 dark:bg-gray-900 hidden p-5 md:flex flex-col items-center justify-between w-[10%] lg:w-[8%] xl:w-[7%] 2xl:w-[5%]">
      <div>
        <Link to="/my-warehouse">
          <Logo />
        </Link>

        {/* Modules */}
        <div className="flex flex-col p-2 mt-5 space-y-5">
          {modules.map(({ name, icon, url }, i) => (
            <NavLinkToolTip key={i} name={name} Icon={icon} url={url} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col space-y-2">
        {/* Settings */}
        <NavLinkToolTip
          onClick={onClickSettings}
          name="Settings"
          Icon={Cog6ToothIcon}
          url="/my-warehouse/settings"
        />
        {/* Logout */}
        <NavLinkToolTip
          name="Logout"
          Icon={ArrowRightOnRectangleIcon}
          url="/login"
          onClick={handleLogout}
        />

        {/* Profile */}
        <div className="w-full h-full pt-5 border-t border-gray-300 dark:border-slate-700">
          <img
            src={user?.profilePic}
            className="object-cover w-10 h-10 rounded-full"
            alt=""
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
