'use client'

import type { Database } from '@/lib/database.types'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserCircle2, LogOut } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

export function LoginButton() {
	return (
		<>
			<Tooltip.Provider delayDuration={500}>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Link href="/login" title="Login" className="button-borderless">
							<UserCircle2 strokeWidth={1.5} />
						</Link>
					</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content>
							<div className="rounded-md bg-content px-2 py-1 text-background">
								Login
							</div>
							<Tooltip.Arrow className="TooltipArrow " />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</>
	)
}

export function LogOutButton() {
	const router = useRouter()
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

	const handleLogout = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	return (
		<>
			<Tooltip.Provider delayDuration={500}>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<button onClick={handleLogout} className="button-borderless">
							<LogOut strokeWidth={1.5} />
						</button>
					</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content>
							<div className="rounded-md bg-content px-2 py-1 text-background">
								Logout
							</div>
							<Tooltip.Arrow className="TooltipArrow " />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			</Tooltip.Provider>
		</>
	)
}
