/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	"./node_modules/@nextui-org/theme/dist/components/spinner.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        boshe: {
          50: "#E5AF89",
          100: "#E3CEAF",
          200: "#87998D",
          300: "#687D78",
          400: "#3E4849",
          500: "#373B3C",
        },
        accent: {
          50: "#7E695C",
          100: "#E6D6C1",
          200: "#607D7E",
          300: "#D08770",
          400: "#2B505C",
          500: "#1A303F",
          600: "#061826",
          700: "#926835",
          800: "#6C4D28",
          900: "#4B351B",
          950: "#382814",
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        warm: {
          50: "#E5AF89",
          100: "#c7946f",
          200: "#2C3E50",
          300: "#800020",
          400: "#FFDB58",
          500: "#273A74",
          600: "#C1440E",
          700: "#C9C8BB",
          800: "#dbdbce",
          900: "#008080",
          950: "#14100d",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
};
