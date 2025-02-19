import type { Config } from "tailwindcss";
import {
  chatBoxMsgTheme,
  darkContainerTheme,
  mainTheme,
  successTheme,
  warningTheme,
  secondaryTheme,
  dangerTheme,
  cardWhite,
  leadText,
  styledBorder,
  buyNowButton,
} from "./constants";
const { heroui } = require("@heroui/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "google-gradient":
          "linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)",
        chatBoxHeader: "linear-gradient(315deg, #182b3a 0%, #20a4f3 74%)",
      },
      colors: {
        mainTheme,
        successTheme,
        warningTheme,
        chatBoxMsgTheme,
        darkContainerTheme,
        secondaryTheme,
        dangerTheme,
        cardWhite,
        leadText,
        styledBorder,
        buyNowButton,
      },
      animation: {
        glow: "glow 1.5s linear 3s infinite",
        markerArrival: "markerArrival 1.5s",
        hideMarkerToolTip: "hideMarkerToolTip 2s",
      },
      keyframes: {
        glow: {
          "0%": { backgroundColor: "#f97316", transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        markerArrival: {
          "0%": { transform: "translateY(-0.2rem)" },
          "25%": { transform: "translateY(0.2rem)" },
          "50%": { transform: "translateY(-0.1rem)" },
          "75%": { transform: "translateY(0.1rem)" },
        },
        hideMarkerToolTip: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        chatConversationContainer: "0px 2px 10px 1px #b5b5b5",
        systemComponentShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
      },
      fontSize: {
        supSmall: "0.6rem",
      },
      screens: {
        mbStart: { max: "750px" },
        mbEnd: { min: "751px" },
        mx625: { max: "625px" },
        mn625: { min: "625px" },
        mx500: { max: "500px" },
        mx475: { max: "475px" },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
