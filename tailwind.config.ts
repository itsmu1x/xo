import type { Config } from "tailwindcss"

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1a1a3c",
                secondary: "#2a2a4a",
                light: "#dedefd",
                accent: "#6c5ffc",
            },
            container: {
                center: true,
            },
        },
    },
    plugins: [],
}

export default config
