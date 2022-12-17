const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      dropShadow: {
        hoverCard: "0 -0.0625rem 0.0625rem rgba(0 0 0 /.1)",
      },
      boxShadow: {
        hoverCard:
          "0 0.125rem 0.5rem rgba(0 0 0 / .3), 0 0.0625rem 0.125rem rgba(0 0 0 / .2)",
      },
      colors: {
        black_rgba: "rgba(0, 0, 0, 0.7)",
        black_rgba_dark: "rgba(0, 0, 0, 0.7)",
        black_rgba_card: "rgba(0, 0, 0, 0.5)",
      },
      spacing: {
        1.5: "1.5px",
        100: "500px",
        0.75: ".75rem",
        "4/4": "100%",
        "6.8/10": "68%",
      },
      backgroundImage: {
        "welcome-image": "url('/public/images/warehouse_login.jpg')",
      },
      transitionDuration: {
        0: "0ms",
        600: "600ms",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    Myclass,
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animate"),
  ],
};
