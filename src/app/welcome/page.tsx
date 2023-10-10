import type { Metadata } from 'next'
import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import WelcomeMessage from './message'
import { ContinueButton } from './button'

export const metadata: Metadata = {
	title: 'Welcome',
}

export default async function Page() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/')
	}

	return (
		<main
			className={`mx-auto flex min-h-screen max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
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
