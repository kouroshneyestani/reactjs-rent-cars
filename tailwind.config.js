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
            },
            borderRadius: {
                default: "6px",
            },
        },
    },
    plugins: [],
};
