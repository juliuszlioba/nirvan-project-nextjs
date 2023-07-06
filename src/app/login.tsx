import { LoginButton, LogOutButton } from '@/components/authButtons'
import { Session } from '@supabase/auth-helpers-nextjs'

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
			{session.user?.email}
			<LogOutButton />
		</div>
	)
}
