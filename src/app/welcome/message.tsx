'use client'

import { useSearchParams } from 'next/navigation'

export default function WelcomeMessage() {
	const searchParams = useSearchParams()

	const error = searchParams.get('error')
	const error_description = searchParams.get('error_description')

	if (error) {
		return (
			<>
				<p className="text-3xl">Oh no...</p>
				<p className="text-xl">{error_description}</p>
			</>
		)
	}

	return (
		<>
			<p className="text-3xl">Welcome back!</p>
			<p className="text-xl">Now you can edit.</p>
		</>
	)
}
