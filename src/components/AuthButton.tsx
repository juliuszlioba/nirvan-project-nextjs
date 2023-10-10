'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserCircle2, LogOut } from 'lucide-react'

import type { Database } from '@/types/database.types'

export function LoginButton() {
	return (
		<>
			<Link href="/login" title="Login" className="button-borderless">
				<UserCircle2 strokeWidth={1.5} />
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
				className="button-borderless"
			>
				<LogOut strokeWidth={1.5} />
			</button>
		</>
	)
}
