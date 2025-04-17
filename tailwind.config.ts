import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#4CE0D7",
        "brand-secondary": "#8BA9F4",
        "brand-accent": "#BCBCBC",
        "brand-dark": "#262626",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],    // for @apply font-body
        heading: ["var(--font-cinzel)", "serif"],        // for @apply font-heading
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};

export default config;
