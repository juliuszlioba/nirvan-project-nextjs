'use client'

import { useRouter } from 'next/navigation'
import { toggleTheme } from '@/lib/colorTheme'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
	const router = useRouter()

	const toggle = async () => {
		await toggleTheme()
		router.refresh()
	}

	return (
		<button
			type="button"
			title="Toggle dark mode"
			aria-label="Toggle dark mode"
			className="border-gray focus:ring-accent-1 flex items-center gap-2 rounded-2xl border-2 px-4 py-2 focus:ring-2 focus-visible:outline-none"
			onClick={toggle}
		>
			<span className="text-gray theme-light">
				<Sun strokeWidth={1.5} className="hover:text-accent-1 h-6 w-6" />
			</span>
			<span className="text-gray theme-dark">
				<Moon strokeWidth={1.5} className="hover:text-accent-1 h-6 w-6" />
			</span>
		</button>
	)
}
