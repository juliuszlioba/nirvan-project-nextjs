import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { MDXRemote } from 'next-mdx-remote/rsc'
import { Literata } from 'next/font/google'
import EditFooter from './edit'

const literata = Literata({
	subsets: ['latin'],
	display: 'swap',
})

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
			className={`${literata.className} flex min-h-screen flex-col items-center p-4 py-8 md:p-8 md:pt-12 xl:py-16 2xl:py-24`}
		>
			<div className="prose prose-slate w-full dark:prose-invert lg:prose-lg prose-h1:font-normal">
				<h1>{data?.title}</h1>
				<MDXRemote source={data?.content as string} />
				{session && <EditFooter slug={data?.slug} />}
			</div>
		</main>
	)
}
