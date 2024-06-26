'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Error() {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<main className="text-center">
			<h2 className="text-3xl">Something went wrong!</h2>
			<p>Most likely mistake in content.</p>
			<div>
				<Button
					className="button mt-4"
					variant={'outline'}
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => router.push(`${pathname}/edit`)
					}
				>
					Edit post
				</Button>
			</div>
		</main>
	)
}
