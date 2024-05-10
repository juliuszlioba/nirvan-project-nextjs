'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<main className="text-center">
			<h2 className="text-3xl">Something went wrong!</h2>
			<div>
				<Button
					className="button mt-4"
					variant={'outline'}
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
				>
					Try again
				</Button>
			</div>
		</main>
	)
}
