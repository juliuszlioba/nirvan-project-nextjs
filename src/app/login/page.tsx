import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from './login-form'

export default async function Page() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/')
	}

	return (
		<main
			className={`mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-4 p-4 py-8 md:p-8 xl:p-12 2xl:p-24`}
		>
			<h1 className="text-3xl">Login</h1>
			<p>Please enter your credentials.</p>
			<LoginForm />
		</main>
	)
}
