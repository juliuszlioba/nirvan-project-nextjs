import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Link from 'next/link'
import ColorSchemeToggleButton from './color-scheme-toggle-button'
import Login from './login'

export async function Header() {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
		<div className="mx-auto max-w-5xl px-4 pb-4 md:pb-8 xl:pb-12 2xl:pb-24">
			<div className="flex w-full flex-wrap items-center justify-between gap-4  border-b-2 border-dashed border-gray-300 px-3 py-3 dark:border-gray-800">
				<div className="flex items-center gap-2">
					{session && (
						<Link
							href="/"
							className="rounded-2xl border-2 border-transparent px-4 py-2 text-lg hover:border-gray-300 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:hover:border-fuchsia-700"
						>
							Library
						</Link>
					)}
					{session && (
						<Link
							href="/add"
							className="flex items-center gap-1 rounded-2xl border-2 border-transparent px-4 py-2 text-lg hover:border-gray-300 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:hover:border-fuchsia-700"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
								/>
							</svg>
							Add new Story
						</Link>
					)}
				</div>
				<div className="ml-auto flex items-center gap-2">
					<Login session={session} />
					<ColorSchemeToggleButton />
				</div>
			</div>
		</div>
	)
}
