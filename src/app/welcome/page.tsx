import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import WelcomeMessage from './message'
import { ContinueButton } from './button'

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
			className={`flex min-h-screen flex-col items-center gap-4 p-4 py-8 md:p-8 xl:p-12 2xl:p-24`}
		>
			<WelcomeMessage />
			<div className="flex justify-center">
				<ContinueButton />
			</div>
		</main>
	)
}
