import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Literata } from 'next/font/google'
import EditFooter from './edit'
import ShareButtons from './share'

type Props = {
	params: { slug: string }
}

const literata = Literata({
	subsets: ['latin'],
	display: 'swap',
})

// do not cache this page
export const revalidate = 0

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const supabase = createServerComponentClient<Database>({ cookies })

	// fetch data
	const { data } = await supabase
		.from('posts')
		.select(`title, author`)
		.eq('slug', params.slug)
		.limit(1)
		.single()

	if (!data) {
		return {
			title: 'Error',
		}
	}

	return {
		title: `${data.title} by ${data.author}`,
	}
}

export default async function Page({ params }: Props) {
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

	if (!data) {
		return null
	}

	return (
		<main
			className={`${literata.className} flex min-h-screen flex-col items-center p-4 py-8 md:p-8 md:pt-12 xl:py-16 2xl:py-24`}
		>
			<div className="prose prose-headings:text-center prose-p:my-1 prose-p:indent-8 prose-slate w-full dark:prose-invert lg:prose-lg prose-h1:font-normal">
				<h1 className="mb-2 lg:mb-4 text-center">{data.title}</h1>
				<p className="italic lg:mb-6 text-gray-500 text-center">
					by {data.author}
				</p>
				<MDXRemote source={data?.content as string} />
				{session?.user.id === data.user_id && <EditFooter slug={data?.slug} />}
				<ShareButtons />
			</div>
			<div className="hidden">
				<p className="text-right"></p>
				<p className="underline"></p>
				<p className="overline"></p>
				<p className="line-through"></p>
				<p className="indent-8"></p>
			</div>
		</main>
	)
}
