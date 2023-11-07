import supabaseServerClient from '@/lib/supabase'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import WelcomeMessage from './message'
import { ContinueButton } from './button'

export const metadata: Metadata = {
	title: 'Welcome',
}

export default async function Page() {
	const supabase = await supabaseServerClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/')
	}

	return (
		<main
			className={`mx-auto flex max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<div className="flex flex-col gap-2">
				<WelcomeMessage />
			</div>
			<div className="flex">
				<ContinueButton />
			</div>
		</main>
	)
}
