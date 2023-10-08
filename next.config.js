/** @type {import('next').NextConfig} */

const { version } = require('./package.json')

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	publicRuntimeConfig: {
		version,
	},
}

module.exports = nextConfig
