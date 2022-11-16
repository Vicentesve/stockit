import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentPath from "../components/CurrentPath";
import Theme from "../components/Theme";
import { updateMe } from "../redux/authSlice";
import { setSubSideNav } from "../redux/sidenavSlice";

const Appearance = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [currentTheme, setCurrentTheme] = useState(user?.settings?.theme);

  const themes = [
    {
      value: 1,
      name: "Light",
      colors: {
        sideNav: {
          surface: "bg-cyan-50",
          selected: "bg-white",
          borders: "border-gray-200",
          texts: "text-gray-500",
          hovers: "hover:bg-white hover:border-gray-300",
        },
        subSideNav: {
          surface: "bg-white",
          selected: "bg-cyan-50",
          borders: "border-gray-200",
          texts: "text-gray-500",
          hovers: "hover:bg-cyan-50 hover:border-gray-300",
        },
        body: {
          surface: "bg-white",
          onSurface: "bg-cyan-50",
          selected: "bg-cyan-100",
          borders: "border-gray-200",
          title: "text-black",
          descriptions: "text-gray-400",
        },
        inputs: {
          surface: "bg-cyan-50",
          borders: "border-gray-300",
          hovers: "hover:bg-cyan-100/75",
          tagTexts: "text-gray-500",
          inputTexts: "text-black",
          selected: "bg-cyan-100/75",
        },
      },
    },
    {
      value: 2,
      name: "Dark",
      colors: {
        sideNav: {
          surface: "bg-gray-900",
          selected: "bg-gray-700",
          borders: "border-gray-700",
          texts: "text-gray-500",
          hovers: "hover:bg-gray-700 hover:border-gray-700",
        },
        subSideNav: {
          surface: "bg-gray-800",
          selected: "bg-gray-700",
          borders: "border-gray-700",
          texts: "text-gray-400",
          hovers: "hover:bg-gray-700 hover:border-gray-700",
        },
        body: {
          surface: "bg-gray-900",
          onSurface: "bg-gray-800",
          selected: "bg-cyan-100",
          borders: "border-gray-900",
          title: "text-white",
          descriptions: "text-gray-400",
        },
        inputs: {
          surface: "bg-gray-800",
          borders: "border-gray-700",
          hovers: "hover:bg-gray-700",
          tagTexts: "text-gray-300",
          inputTexts: "text-white",
          selected: "bg-gray-700",
        },
        tables: {
          thead: "bg-gray-800",
          theadTitle: "text-gray-400",
          tbodyText: "text-gray-400",
          borders: "border-gray-700",
          selected: "bg-gray-700",
          hovers: "hover:bg-gray-700",
        },
      },
    },
  ];

  const submitAppearanceSettings = (data) => {
    setCurrentTheme(data.value);

    data.id = user._id;
    data.type = "appearence";
    dispatch(updateMe({ data }));
  };

  const buildNavRoute = () => {
    const arrayPath = window.location.pathname.split("/");
    arrayPath.shift();
    let navPath = [];
    let concatRoute = "";
    // eslint-disable-next-line array-callback-return
    arrayPath.map((data, i) => {
      const dataPush = {};

      dataPush.route = `${concatRoute}/${data}`;
      dataPush.name = data;
      concatRoute = concatRoute.concat(`/${data}`);
      navPath.push(dataPush);
    });
    navPath[1].onClick = () => dispatch(setSubSideNav(true));

    return navPath;
  };

  return (
    <div className="flex flex-col w-full h-screen px-10 py-5">
      <CurrentPath arrayPath={buildNavRoute()} />
      {/* Container */}
      <div className="sm:w-[60%] h-full flex flex-col">
        {/* Choose Theme */}
        <h3 className="mt-5 text-gray-400 text-md">Choose your theme</h3>
        {/* Divider */}
        <hr className="mt-5 border-t border-gray-200 dark:border-gray-600" />

        {/* Choose theme */}
        <div className="flex space-x-10">
          {themes.map((theme, i) => (
            <Theme
              key={i}
              /* SideNav */
              sideNavSurfaceColor={theme.colors.sideNav.surface}
              sideNavSelectedColor={theme.colors.sideNav.selected}
              sideNavBordersColor={theme.colors.sideNav.borders}
              /* SubSideNav */
              subSideNavSurfaceColor={theme.colors.subSideNav.surface}
              subSideNavSelectedColor={theme.colors.subSideNav.selected}
              subSideNavBordersColor={theme.colors.subSideNav.borders}
              /* Body */
              bodySurfaceColor={theme.colors.body.surface}
              bodyOnSurfaceColor={theme.colors.body.onSurface}
              bodyBordersColor={theme.colors.body.borders}
              /* Actions */
              name={theme.name}
              onSubmit={submitAppearanceSettings}
              data={theme}
              currentTheme={currentTheme}
            />
          ))}
        </div>

        {/* Choose accent color */}
        <h3 className="mt-10 text-gray-400 text-md">
          Choose your accent color
        </h3>
        {/* Divider */}
        <hr className="mt-5 border-t border-gray-200 dark:border-gray-600" />
      </div>
    </div>
  );
};

export default Appearance;
