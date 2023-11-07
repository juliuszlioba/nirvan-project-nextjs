import supabaseServerClient from '@/lib/supabase'
import Link from 'next/link'
import Login from './login'
import { Library, FilePlus } from 'lucide-react'
import ThemeSwitch from '@/components/ThemeSwitch'

export async function Header() {
	const supabase = await supabaseServerClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data: user } = await supabase
		.from('users')
		.select('permission')
		.eq('id', session?.user.id as string)
		.single()

	return (
		<div className="mx-auto max-w-5xl px-4 pb-4 md:pb-8 xl:pb-12 2xl:pb-24">
			<div className="flex w-full flex-wrap items-center justify-between gap-1 border-b-2 border-dashed border-gray-light py-3">
				<div className="flex items-center gap-1">
					<Link href="/" className="button-borderless">
						<Library strokeWidth={1.5} />
					</Link>

					{session && user?.permission !== 'SUBSCRIBER' && (
						<Link href="/add" className="button-borderless">
							<FilePlus strokeWidth={1.5} />
							<span className="max-sm:hidden">Add Story</span>
						</Link>
					)}
				</div>
				<div className="ml-auto flex items-center gap-2">
					<Login session={session} />
					<ThemeSwitch />
				</div>
			</div>
		</div>
	)
}
