import { Button } from '@/components/ui/button'
import { FileEdit } from 'lucide-react'
import Link from 'next/link'

export default function EditFooter({ slug }: { slug: string | undefined }) {
	if (!slug) {
		return null
	}

	return (
		<div className="border-gray mt-8 flex items-center justify-between gap-1 border-t-2 border-dashed pb-8 pt-4">
			<Button variant={'ghost'} asChild>
				<Link
					href={`/post/${slug}/edit`}
					className="link flex items-center gap-1"
				>
					<FileEdit strokeWidth={1.5} />
					Edit
				</Link>
			</Button>
		</div>
	)
}
