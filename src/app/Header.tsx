import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ThemeToggle from '../components/ThemeToggle'
import Login from './login'
import { Library, FilePlus } from 'lucide-react'

export async function Header() {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	return (
		<div className="mx-auto max-w-5xl px-4 pb-4 md:pb-8 xl:pb-12 2xl:pb-24">
			<div className="border-gray flex w-full flex-wrap items-center justify-between gap-1 border-b-2 border-dashed py-3">
				<div className="flex items-center gap-1">
					<Link href="/" className="button-borderless">
						<Library strokeWidth={1.5} />
					</Link>

					{session && (
						<Link href="/add" className="button-borderless">
							<FilePlus strokeWidth={1.5} />
							<span className="max-sm:hidden">Add Story</span>
						</Link>
					)}
				</div>
				<div className="ml-auto flex items-center gap-2">
					<Login session={session} />
					<ThemeToggle />
				</div>
			</div>
		</div>
	)
}
