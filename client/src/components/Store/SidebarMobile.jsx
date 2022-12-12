import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRightOnRectangleIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { logout } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { setSubSideNav } from "../../redux/sidenavSlice";

const SidebarMobile = ({ categories }) => {
  const dispatch = useDispatch();
  const { subsidenavValue } = useSelector((state) => state.sidenavState);
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`fixed top-0  w-[80%] z-[100]  h-full ease-in-out transition duration-300 overflow-y-scroll shadow-md border-r border-gray-200 ${
        subsidenavValue ? "translate-x-0 " : "-translate-x-full "
      }`}
    >
      <aside className="absolute  w-full z-[150]  flex flex-col overflow-y-scroll overflow-x-hidden   h-screen  bg-cyan-50 dark:bg-gray-900 ">
        <div className="p-5 text-white bg-slate-900">
          <div className="flex justify-end text-sm">
            {user ? (
              <button
                onClick={() => dispatch(logout())}
                className="flex px-3 py-1 space-x-1 text-sm font-medium text-center border border-gray-800 rounded-lg hover:text-white hover:bg-gray-700 focus:ring-1 focus:outline-none focus:ring-gray-300"
              >
                <ArrowRightOnRectangleIcon className="h-5" />{" "}
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="login"
                onClick={() => dispatch(setSubSideNav(false))}
                className="px-3 py-1 border border-gray-800 rounded-md outline-none hover:bg-gray-700"
              >
                Sign In
              </Link>
            )}
          </div>

          <h3>{user ? `Hello, ${user?.name}!` : "Explore"}</h3>
          <Link to="/">
            <div className="flex items-center mt-1 space-x-1 text-white">
              <CubeIcon className="h-6" />
              <h3 className="text-sm font-extrabold tracking-widest uppercase select-none whitespace-nowrap">
                Stock it
              </h3>
            </div>
          </Link>
        </div>

        <div className="p-5">
          {user ? (
            <>
              <h3 className="text-lg font-semibold">My Account</h3>

              <ul className="mt-3 ml-4 space-y-1 border-l border-gray-300">
                <Link
                  onClick={() => dispatch(setSubSideNav(false))}
                  to="/my-account"
                >
                  <li className="px-2 py-1">Account</li>
                </Link>
                <Link
                  onClick={() => dispatch(setSubSideNav(false))}
                  to="/orders"
                >
                  <li className="px-2 py-1">Orders</li>
                </Link>
                {user?.hasWarehouse ? (
                  <li className="px-2 py-1">
                    <a href="/my-warehouse">See my warehouse</a>
                  </li>
                ) : null}
              </ul>
            </>
          ) : null}

          <h3 className="mt-5 text-lg font-semibold">Main Categories</h3>
          <ul className="mt-3 ml-4 space-y-1 border-l border-gray-300">
            {categories?.map((category, i) => (
              <li key={i} className="px-2 py-1">
                <Link
                  onClick={() => dispatch(setSubSideNav(false))}
                  to={`category/${category._id}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarMobile;
