'use client'

import { useRouter } from 'next/navigation'

export function ContinueButton() {
	const router = useRouter()

	const handleNextStep = async () => {
		await router.refresh()
		return router.push('/')
	}

	return (
		<>
			<button
				onClick={() => handleNextStep()}
				className="border-gray hover:border-accent-1 rounded-2xl border-2 px-4 py-2"
			>
				Continue
			</button>
		</>
	)
}
