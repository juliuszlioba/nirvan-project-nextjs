import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import type { Database } from '@/lib/database.types'

export default async function SignUpPage() {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/')
	}

	return (
		<main
			className={`mx-auto flex min-h-screen max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<h2 className="text-3xl">Authentication error</h2>
			<div>
				<Link className="button" href="/">
					Go Home
				</Link>
			</div>
		</main>
	)
}
