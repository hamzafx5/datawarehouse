module.exports = {
	content: ["./dist/index.html"],
	darkMode: "class",
	theme: {
		fontFamily: {
			sans: ["Open Sans", "sans-serif"],
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				// lg: "2rem",
				// lg: "4rem",
				// xl: "6rem",
				// "2xl": "8rem",
			},
		},

		extend: {
			colors: {
				primary: "#9C69E2",
				secondary: "#F063B8",
				third: "#68C9BA",
				clr: "#212353",
				"light-pink": "rgba(240, 99, 184, 0.15)",
			},
			screens: {
				tm: { raw: "(max-width: 768px)" },
				phone: { raw: "(max-width: 640px)" },
			},
		},
	},
	plugins: [],
};
