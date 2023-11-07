import supabaseServerClient from '@/lib/supabase'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import UpdatePassword from '@/components/Auth/UpdatePassword'

export const metadata: Metadata = {
	title: 'Update Password',
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
			<UpdatePassword />
		</main>
	)
}
