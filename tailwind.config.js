/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			gray: colors.stone,
			fuchsia: colors.fuchsia,
			red: colors.red,
			blue: colors.blue,
		},

		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [typography, forms],
}
