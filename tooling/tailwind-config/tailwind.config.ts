import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Neutral palette - Mercury White to Nordic Gray
        neutral: {
          50: "#F4F5F8",   // Mercury White
          100: "#E8E9ED",
          200: "#D1D3DA",
          300: "#B0B3BD",
          400: "#8E929F",
          500: "#6D7282",
          600: "#565A67",
          700: "#40434D",
          800: "#2B2D33",
          900: "#222326",  // Nordic Gray
          950: "#18191B",
        },

        // Patient Platform (Blues)
        patient: {
          50: "#E8F7FB",
          100: "#C5EBF5",
          200: "#93DBF0",
          300: "#71D3DC",
          400: "#4AC4E3",
          500: "#29B5E8",  // Primary
          600: "#1E8DB8",
          700: "#11567F",
          800: "#0A3D5C",
          900: "#003545",
        },

        // Doctor Platform (Reds)
        doctor: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#F5A3AA",
          400: "#F87171",
          500: "#DC3545",  // Primary
          600: "#C82333",
          700: "#A71D2A",
          800: "#861922",
          900: "#6B1520",
        },

        // Pharmacy Platform (Purples)
        pharmacy: {
          50: "#F5F0FC",
          100: "#EBE0F9",
          200: "#D6C1F2",
          300: "#C4A8E8",
          400: "#A87EDB",
          500: "#7D44CF",  // Primary
          600: "#6935B0",
          700: "#5B2D9E",
          800: "#4A2380",
          900: "#3C0045",
        },

        // Employer Platform (Oranges)
        employer: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FFB347",
          500: "#FF9F36",  // Primary
          600: "#EA7E00",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },

        // Status colors
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        info: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },

      spacing: {
        // 4dp grid system
        0.5: "2px",
        1: "4px",
        1.5: "6px",
        2: "8px",
        2.5: "10px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
      },

      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },

      zIndex: {
        background: "-1",
        base: "0",
        elevated: "10",
        floating: "20",
        sticky: "30",
        header: "40",
        dropdown: "50",
        drawer: "60",
        "modal-backdrop": "70",
        modal: "80",
        tooltip: "90",
        toast: "100",
        emergency: "9000",
        critical: "9999",
      },

      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },

      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "fade-out": "fade-out 150ms ease-in",
        "slide-in-from-top": "slide-in-from-top 200ms ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 200ms ease-out",
        "slide-out-to-top": "slide-out-to-top 150ms ease-in",
        "slide-out-to-bottom": "slide-out-to-bottom 150ms ease-in",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-out-to-top": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        "slide-out-to-bottom": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
