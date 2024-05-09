import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import Header from '@/components/layout/header'

import { GeistSans } from 'geist/font/sans'

//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Science Fiction & Fantasy Book Club',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable}`}
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<div className="px-4">
						<main className="mx-auto max-w-5xl pt-12 lg:py-24">{children}</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
