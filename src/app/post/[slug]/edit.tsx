import Link from 'next/link'

export default function EditFooter({ slug }: { slug: string | undefined }) {
	if (!slug) {
		return null
	}

	return (
		<div className="mt-8 flex items-center justify-between gap-1 border-t-2 border-dashed border-gray-300 pb-8 pt-4 dark:border-gray-700">
			<Link
				href={`/post/${slug}/edit`}
				className="link flex items-center gap-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-file-edit"
				>
					<path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
					<polyline points="14 2 14 8 20 8" />
					<path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
				</svg>
				Edit
			</Link>
		</div>
	)
}
