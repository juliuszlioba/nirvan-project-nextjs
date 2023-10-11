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
	//darkMode: 'class',
	theme: {
		colors: {
			background: 'rgb(var(--color-background) / <alpha-value>)',
			content: 'rgb(var(--color-content) / <alpha-value>)',
			accent: {
				1: 'rgb(var(--color-accent-1) / <alpha-value>)',
			},
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			gray: 'rgb(var(--color-gray) / <alpha-value>)',
			"gray-light": 'rgb(var(--color-gray-light) / <alpha-value>)',
			red: colors.red,
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
