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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: "var(--black)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        "gold-deep": "var(--gold-deep)",
        cream: "var(--cream)",
        "black-2": "var(--black-2)",
        "black-3": "var(--black-3)",
        "black-4": "var(--black-4)",
      },
      fontFamily: {
        display: ["Cormorant", "serif"],
        heading: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem,10vw,9rem)", { lineHeight: "0.95" }],
        "display-xl": ["clamp(3rem,7vw,6.5rem)", { lineHeight: "1" }],
        "display-lg": ["clamp(2.5rem,5vw,5rem)", { lineHeight: "1.05" }],
        "display-md": ["clamp(2rem,3.5vw,3.5rem)", { lineHeight: "1.1" }],
      },
      backgroundImage: {
        "gradient-gold":
          "linear-gradient(135deg, #e8c56a 0%, #c9a84c 50%, #8b6914 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
