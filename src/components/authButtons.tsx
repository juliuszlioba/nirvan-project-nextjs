'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {
	UserCircleIcon,
	ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

import type { Database } from '@/types/database.types'
import Link from 'next/link'

export function LoginButton() {
	return (
		<>
			<Link
				href="/login"
				title="Login"
				className="rounded-2xl border-2 border-transparent p-1.5 text-gray-800 hover:border-fuchsia-700 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:border-transparent dark:text-gray-200 dark:hover:border-fuchsia-700"
			>
				<UserCircleIcon className="h-6 w-6" width="24" height="24" />
			</Link>
		</>
	)
}

export function LogOutButton() {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()

	const handleLogout = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	return (
		<>
			<button
				onClick={handleLogout}
				title="Logout"
				className="rounded-2xl border-2 border-transparent p-1.5 text-gray-800 hover:border-fuchsia-700 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:border-transparent dark:text-gray-200 dark:hover:border-fuchsia-700"
			>
				<ArrowLeftOnRectangleIcon className="h-6 w-6" width="24" height="24" />
			</button>
		</>
	)
}
