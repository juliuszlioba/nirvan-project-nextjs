import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import EditPost from './form'

// do not cache this page
export const revalidate = 0

export default async function Page({ params }: { params: { slug: string } }) {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data } = await supabase
		.from('posts')
		.select('*')
		.eq('slug', params.slug)
		.limit(1)
		.single()

	return (
		<main
			className={`mx-auto flex min-h-screen max-w-4xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			{session && <EditPost post={data} session={session} />}
		</main>
	)
}
