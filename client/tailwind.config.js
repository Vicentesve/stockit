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
      colors: {
        black_rgba: "rgba(0, 0, 0, 0.7)",
        black_rgba_dark: "rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "welcome-image": "url('/public/images/warehouse_login.jpg')",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    Myclass,
    require("@tailwindcss/line-clamp"),
  ],
};
