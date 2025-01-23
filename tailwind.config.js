/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        BYekan: ["BYekan"],
      },
      backgroundImage: {
        header: "url('src/images/Header/PNGs/header-bg.png')",
        headerDark: "url('src/images/Header/PNGs/headerdark.png')",
        headerDark2: "url('src/images/Header/PNGs/headerdark2.png')",
        headerDark22: "url('src/images/Header/PNGs/headerdark2.png')",
        headerDark3: "url('src/images/Header/PNGs/headerbg-4.png')",
        shopping: "url('/images/Header/SVGs/shopping-bag.svg')",
        heroCourses: "url('src/images/CorsesPage/HeroSecCourses/Group.png')",
        heroNews: "url('src/images/NewsPage/Asset12.png')",
      },
      borderImage: {
        "landing-gradient":
          "linear-gradient(270deg, rgba(33, 150, 243, 0) 0%, rgba(33, 150, 243, 0.4) 49.9%, rgba(33, 150, 243, 0) 100%)",
      },
      boxShadow: {
        "ّFirst-shadow": "0px 0px 50px 0px #0000000D",
        "Second-shadow": "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
    },
  },
  plugins: [],
};
