'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Error() {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<main
			className={`flex flex-col items-center p-4 py-8 md:p-8 md:pt-12 xl:py-16 2xl:py-24`}
		>
			<h2>Something went wrong!</h2>
			<p>Most likely mistake in content.</p>
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
		</main>
	)
}
