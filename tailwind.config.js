// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--afc-background-color)",
                text: "var(--afc-text-color)",
                primary: "var(--afc-primary-color)",
                secondary: "var(--afc-secondary-color)",
                overlay: "var(--afc-overlay-color)",
            },
            borderRadius: {
                default: "6px",
            },
            fontFamily: {
                1: ["afc-font-1", "sans-serif"],
                2: ["afc-font-2", "sans-serif"],
                3: ["afc-font-3", "sans-serif"],
                4: ["afc-font-4", "sans-serif"],
            },
        },
    },
    plugins: [],
};
