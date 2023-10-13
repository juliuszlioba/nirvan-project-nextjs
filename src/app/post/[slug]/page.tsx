import type { Database } from '@/lib/database.types'
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
			<div className="pb-8">
				<h1 className="pb-3 text-center text-2xl lg:text-4xl">{data.title}</h1>
				<p className="text-center italic">by {data.author}</p>
			</div>
			<div className="prose w-full bg-background text-content lg:prose-lg prose-headings:text-center prose-headings:text-content prose-h1:font-normal prose-p:my-1 prose-p:indent-8 prose-a:text-content prose-blockquote:text-content prose-strong:text-content prose-code:text-content prose-ol:text-content prose-img:mx-auto">
				<MDXRemote source={data?.content as string} />
				{session?.user.id === data.user_id && <EditFooter slug={data?.slug} />}
				<ShareButtons />
			</div>
			<div className="hidden">
				<p className="text-right"></p>
				<p className="underline"></p>
				<p className="overline"></p>
				<p className="line-through"></p>
				<p className="divider"></p>
			</div>
		</main>
	)
}
