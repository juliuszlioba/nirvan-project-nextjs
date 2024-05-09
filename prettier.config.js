/** @type {import("prettier").Config} */
const config = {
	trailingComma: 'es5',
	tabWidth: 2,
	semi: false,
	useTabs: true,
	singleQuote: true,
	plugins: ['prettier-plugin-tailwindcss'],
}

module.exports = config
