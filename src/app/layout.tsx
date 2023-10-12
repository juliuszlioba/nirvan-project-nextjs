import type { Metadata } from 'next'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthProvider from '@/components/AuthProvider'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from './Header'
import { PT_Sans } from 'next/font/google'
import '../styles/globals.css'

const pt_sans = PT_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
})

export const metadata: Metadata = {
	title: 'SFFBC',
	description: 'Collection of short stories',
	robots: {
		index: true,
		follow: false,
	},
}

// Prevent default cache method, overwise error during build
export const dynamic = 'force-dynamic'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const supabase = createServerComponentClient({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const accessToken = session?.access_token || null

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${pt_sans.className}`}>
				<AuthProvider accessToken={accessToken}>
					<ThemeProvider defaultTheme="system" enableSystem>
						<Header />
						{children}
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
