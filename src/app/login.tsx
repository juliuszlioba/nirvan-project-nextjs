import { LoginButton, LogOutButton } from '@/components/authButtons'
import { Session } from '@supabase/auth-helpers-nextjs'
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
		<div className="flex items-center gap-2">
			<Link href="/user" className="hover:text-fuchsia-700">
				{session.user?.email}
			</Link>
			<LogOutButton />
		</div>
	)
}
