import { Link } from "react-router-dom";

function CurrentPath({ arrayPath }) {
  const getLocation = (location) => {
    return location.substring(location.lastIndexOf("/") + 1);
  };
  return (
    <div>
      <nav className="flex mb-4">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {arrayPath.map((value, i) =>
            value.name === "my-warehouse" ? (
              <li key={i} className="inline-flex cursor-default">
                <Link to={value?.route}>
                  <button className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <p>Home</p>
                  </button>
                </Link>
              </li>
            ) : (
              <li key={i} className="inline-flex items-center cursor-default">
                <Link
                  onClick={() => (value?.onClick ? value.onClick() : "")}
                  to={value?.route}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="ml-1 text-sm font-medium text-gray-700 capitalize md:ml-2 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {value.name.replaceAll("-", " ")}
                    </p>
                  </div>
                </Link>
              </li>
            )
          )}
        </ol>
      </nav>

      {/* Name Page */}
      <h2 className={`mt-5 text-4xl font-extrabold dark:text-white capitalize`}>
        {getLocation(window.location.pathname).replaceAll("-", " ")}
      </h2>
    </div>
  );
}

export default CurrentPath;
