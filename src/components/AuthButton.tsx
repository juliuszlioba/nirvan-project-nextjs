'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserCircle2, LogOut } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

import type { Database } from '@/types/database.types'

export function LoginButton() {
	return (
		<>
			<Tooltip.Provider delayDuration={300}>
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
	const supabase = createClientComponentClient<Database>()

	const handleLogout = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}

	return (
		<>
			<Tooltip.Provider delayDuration={300}>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<button
							onClick={handleLogout}
							title="Logout"
							className="button-borderless"
						>
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
