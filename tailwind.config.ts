import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shadow: "#00000",
        background: "#323437",
        midground: {
          "0": "#313336",
          "1": "#333538",
          "2": "#35373a",
          "3": "#3b4d61",
        },
        fadedforeground: "#8c6f30",
        foreground: "#f3ca20",
        foregroundShadow: "#141103",
        textColour: "#6b7b8c",
      },
      height: {
        screen: "100vh",
      },
      width: {
        screen: "100vw",
      },
      borderWidth: {
        "5p": "5%", // Adds a border width utility for 5%
      },

      fontFamily: {
        secondaryfont: ["GeistMono", "sans-serif"], // Add your custom fonts
        mainfont: ["CodaCaption", "sans-serif"],
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [],
} satisfies Config;
