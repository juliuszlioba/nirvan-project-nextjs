import supabaseServerClient from '@/lib/supabase'
import type { Metadata } from 'next'
import EditPost from './form'
import { redirect } from 'next/navigation'

// do not cache this page
export const revalidate = 0

export const metadata: Metadata = {
	title: 'Editing Story',
}

export default async function Page({ params }: { params: { slug: string } }) {
	const supabase = await supabaseServerClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data } = await supabase
		.from('posts')
		.select('*')
		.eq('slug', params.slug)
		.limit(1)
		.single()

	if (!data) {
		return redirect('/')
	}

	if (session?.user.id !== data.user_id) {
		return redirect('/')
	}

	return (
		<main
			className={`mx-auto flex max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<EditPost post={data} />
		</main>
	)
}
