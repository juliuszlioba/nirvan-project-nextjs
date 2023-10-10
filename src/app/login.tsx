import { LoginButton, LogOutButton } from '@/components/AuthButton'
import { Session } from '@supabase/auth-helpers-nextjs'
import { UserCircle2 } from 'lucide-react'
import Link from 'next/link'

export default async function Login({ session }: { session: Session | null }) {
	if (!session) {
		return (
			<div className="flex">
				<LoginButton />
			</div>
		)
	}

	return (
		<div className="flex items-center gap-1">
			<Link href="/user" className="button-borderless">
				<UserCircle2 strokeWidth={1.5} className="sm:hidden" />
				<span className="max-sm:hidden">{session.user?.email}</span>
			</Link>
			<LogOutButton />
		</div>
	)
}
