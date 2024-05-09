import { FileWarning } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Literata } from 'next/font/google'

const literata = Literata({
	subsets: ['latin'],
	display: 'swap',
})

export default async function PreviewPost({
	post,
}: {
	post: {
		author_last_name: string
		author_first_name: string
		content: string
		createdat: string
		id: number
		slug: string
		title: string
		updatedat: string
		user_id: string | null
		year: number
	} | null
}) {
	if (!post) {
		return null
	}

	async function getContent() {
		const modifiedText = post?.content.replaceAll('class=', 'className=')
		try {
			const result = await MDXRemote({
				source: modifiedText as string,
			})
			return result
		} catch (error) {
			return (
				<div className="flex h-full flex-col items-center justify-center">
					<FileWarning size={36} strokeWidth={1.5} />
					<h3 className="text-2xl">Error in Code</h3>
				</div>
			)
		}
	}

	return (
		<>
			<p>Content preview:</p>
			<div
				className={`${literata.className} rounded-lg border-2 border-dashed p-8`}
			>
				<div className="prose mx-auto w-full bg-background text-foreground lg:prose-lg prose-headings:text-center prose-headings:text-foreground prose-h1:font-normal prose-p:my-2 prose-p:indent-8 prose-p:leading-[1.45] prose-a:text-foreground prose-blockquote:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-ol:text-foreground prose-img:mx-auto">
					{getContent()}
				</div>
			</div>
		</>
	)
}
