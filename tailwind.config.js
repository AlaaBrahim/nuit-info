/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "480px",
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"],
			"2P": ["Press Start 2P"],
			code: ["source-code-pro", "monospace"],
		},
		extend: {
			colors: {
				primary: "#333",
				secondary: "#696",
			},
		},
	},
	plugins: [],
};
