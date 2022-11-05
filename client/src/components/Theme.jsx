import { CheckCircleIcon } from "@heroicons/react/24/solid";

function Theme({
  name,
  /* SideNac */
  sideNavSurfaceColor,
  sideNavSelectedColor,
  sideNavBordersColor,
  /* SubSideNav */
  subSideNavSurfaceColor,
  subSideNavSelectedColor,
  subSideNavBordersColor,
  /* Body */
  bodySurfaceColor,
  bodyOnSurfaceColor,
  bodySelectedColor,
  bodyBordersColor,
  onSubmit,
  data,
  currentTheme,
}) {
  return (
    <div
      onClick={() => onSubmit(data)}
      className="flex flex-col text-center w-36"
    >
      <div
        className={`w-full h-36 mt-5 flex justify-end items-end rounded-md cursor-pointer 
        shadow-md border-2  hover:border-blue-600 dark:hover:border-blue-500   ${
          currentTheme === data.value
            ? "border-blue-600 dark:border-blue-500"
            : "border-gray-200 dark:border-gray-600"
        }`}
      >
        <div className="relative flex w-32 h-32">
          {/* SideNav */}
          <div
            className={`${sideNavSurfaceColor} ${sideNavBordersColor} w-[25%] h-full rounded-tl-md flex flex-col justify-center p-[2px] border-t border-l`}
          >
            <div
              className={`${sideNavSelectedColor} ${sideNavBordersColor} flex justify-center rounded-sm cursor-pointer w-full h-2 border shadow-sm`}
            />
          </div>

          {/* SuSideNav */}
          <div
            className={`${subSideNavSurfaceColor} ${subSideNavBordersColor} w-[20%] h-full flex flex-col p-[2px] border-t`}
          >
            <div
              className={`${subSideNavSelectedColor} ${subSideNavBordersColor} flex justify-center rounded-sm cursor-pointer w-full h-2 mt-2 border shadow-sm`}
            />
          </div>

          {/* Body */}
          <div
            className={`${bodySurfaceColor} ${subSideNavBordersColor} border-t w-[55%] h-full flex flex-col py-1 px-[5px]`}
          >
            {/* Filter */}
            <div className={`h-[10%] w-full rounded-sm flex space-x-1`}>
              <div
                className={`${bodyOnSurfaceColor} ${bodyBordersColor} border rounded-sm w-4 h-2 `}
              ></div>
              <div
                className={`${bodyOnSurfaceColor} ${bodyBordersColor} border rounded-sm w-4 h-2 `}
              ></div>
              <div
                className={`${bodyOnSurfaceColor} ${bodyBordersColor} border rounded-sm w-4 h-2 `}
              ></div>
            </div>

            {/* Table */}
            <div
              className={`${bodyOnSurfaceColor} ${bodyBordersColor} border h-[40%] w-full rounded-sm mt-2`}
            ></div>
          </div>

          <CheckCircleIcon
            className={`h-7 absolute text-blue-600 dark:text-blue-500 bottom-0 right-0 ${
              currentTheme === data.value ? "block" : "hidden"
            }`}
          />
        </div>
      </div>
      <h2 className="mt-2 font-semibold">{name}</h2>
    </div>
  );
}

export default Theme;
