import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060d17",
          900: "#0a192f",
          850: "#0e203c",
          800: "#132b4f",
          700: "#1c3d6e",
          600: "#254e8b",
          100: "#e9f0f8",
          50: "#f3f7fb",
        },
        brandBlue: {
          DEFAULT: "#0A5084",
          50: "#f0f6fa",
          100: "#d9e8f3",
          200: "#b5d4e7",
          300: "#86b8d7",
          600: "#0e64a4",
          700: "#0A5084",
          800: "#08416c",
          900: "#063152",
        },
        gold: {
          700: "#8c6b1f",
          600: "#a9822a",
          500: "#c5a046",
          400: "#d8b663",
          300: "#e8cf8c",
          200: "#f2e4bd",
          100: "#f9f4e5",
          50: "#fdfbf5",
        },
        surface: {
          dark: "#0a192f",
          light: "#fcfcfd",
          muted: "#f4f6f9",
          card: "#ffffff",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'premium': '0 10px 30px -5px rgba(10, 25, 47, 0.08), 0 4px 6px -2px rgba(10, 25, 47, 0.03)',
        'premium-hover': '0 20px 40px -10px rgba(10, 25, 47, 0.15), 0 8px 10px -3px rgba(10, 25, 47, 0.05)',
        'gold-glow': '0 0 25px rgba(197, 160, 70, 0.25)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
export default config;
