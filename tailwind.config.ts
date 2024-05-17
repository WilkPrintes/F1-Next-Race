import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg_root: {
          DEFAULT: "hsl(var(--background-root))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bg_label: "hsl(var(--bg_label))",
      },
    },
    fontFamily: {
      poppins: ["var(--font-poppins)"],
    },
  },
  plugins: [],
};
export default config;
