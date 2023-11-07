import supabaseServerClient from '@/lib/supabase'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AddPost from './form'

// do not cache this page
export const revalidate = 0

export const metadata: Metadata = {
	title: 'Add new Story',
}

export default async function Page() {
	const supabase = await supabaseServerClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data: user } = await supabase
		.from('users')
		.select('permission')
		.eq('id', session?.user.id as string)
		.single()

	if (!session) {
		redirect('/')
	}

	if (session && user?.permission !== 'SUBSCRIBER') {
		return (
			<main
				className={`mx-auto flex max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
			>
				<AddPost />
			</main>
		)
	} else {
		redirect('/')
	}
}
