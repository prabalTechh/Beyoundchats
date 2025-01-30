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
        PrimaryButton: "#64ED80",
        SecondaryButton: "#2872FA",
        PrimaryBackground: "#001433",
        offWhiteLogo: '#FFF9F9',

      }, fontFamily: {
        liter: ['Liter', 'serif'],
        inter:["Inter", 'serif'],
      },

    },
  },
  plugins: [],
} satisfies Config;
