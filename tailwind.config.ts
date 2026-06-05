import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF6",
        paper: "#FFFFFF",
        ink: "#141210",
        orange: {
          DEFAULT: "#FF5C00",
          deep: "#E04E00"
        },
        yellow: "#FFD23F",
        blue: "#2D5BFF",
        green: "#16A56B",
        lilac: "#C9B8FF",
        pink: "#FF7DB0"
      },
      fontFamily: {
        display: ["Anton", "Arial Narrow", "sans-serif"],
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        nb: "6px 6px 0 #141210",
        "nb-sm": "4px 4px 0 #141210",
        "nb-lg": "9px 9px 0 #141210"
      },
      borderWidth: {
        3: "3px"
      },
      letterSpacing: {
        mono: "0.08em",
        eyebrow: "0.14em"
      }
    }
  },
  plugins: []
};

export default config;
