import type { Metadata } from 'next'

import './globals.css'
import { PT_Sans } from 'next/font/google'
import { getCurrentScheme } from '@/utils/colorScheme'
import { Footer } from './footer'

const pt_sans = PT_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
})

export const metadata: Metadata = {
	title: 'Short stories',
	description: 'Collection of short stories',
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
}

// Prevent default cache method, overwise error during build
export const dynamic = 'force-dynamic'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const scheme = await getCurrentScheme()

	return (
		<html lang="en" className={scheme === 'dark' ? 'dark' : ''}>
			<body
				className={`${pt_sans.className} bg-gray-200 dark:bg-gray-900 dark:text-gray-200`}
			>
				{children}
				<Footer />
			</body>
		</html>
	)
}
