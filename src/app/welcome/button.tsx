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
				className="rounded-2xl border-2 border-gray-300 px-4 py-2 hover:border-fuchsia-700 dark:border-gray-800 dark:hover:border-fuchsia-700"
			>
				Continue
			</button>
		</>
	)
}
