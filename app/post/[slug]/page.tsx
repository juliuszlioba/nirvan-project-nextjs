import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import { Literata } from 'next/font/google'
import EditFooter from './edit'
import ShareButtons from './share'
import { MDXRemote } from 'next-mdx-remote/rsc'

const literata = Literata({
	subsets: ['latin'],
	display: 'swap',
})

type Props = {
	params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const supabase = createClient()

	// fetch data
	const { data } = await supabase
		.from('posts')
		.select(`title, author_last_name, author_first_name`)
		.eq('slug', params.slug)
		.limit(1)
		.single()

	if (!data) {
		return {
			title: 'Error',
		}
	}

	return {
		title: `${data.title} by ${data.author_first_name} ${data.author_last_name}`,
	}
}

export default async function PostPage({ params }: Props) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data: userRoles } = await supabase
		.from('users')
		.select('permission')
		.eq('id', user?.id as string)
		.single()

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
		<>
			<div className={`${literata.className}`}>
				<div className="pb-8">
					<h1 className="pb-3 text-center text-2xl lg:text-4xl">
						{data.title}
					</h1>
					<p className="text-center italic">
						by {data.author_first_name} {data.author_last_name}
					</p>
				</div>
				<div className="prose mx-auto w-full bg-background text-foreground lg:prose-lg prose-headings:text-center prose-headings:text-foreground prose-h1:font-normal prose-p:my-2 prose-p:indent-8 prose-p:leading-[1.45] prose-a:text-foreground prose-blockquote:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-ol:text-foreground prose-img:mx-auto">
					<MDXRemote source={data?.content as string} />
				</div>
			</div>
			<div>
				{(user?.id === data.user_id || userRoles?.permission === 'ADMIN') && (
					<EditFooter slug={data?.slug} />
				)}
				<ShareButtons />
				<div className="hidden">
					<p className="text-right"></p>
					<p className="underline"></p>
					<p className="overline"></p>
					<p className="line-through"></p>
					<p className="divider"></p>
					<p className="picture-caption"></p>
					<p className="!indent-0"></p>
				</div>
			</div>
		</>
	)
}
