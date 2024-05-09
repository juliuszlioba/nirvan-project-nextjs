import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { LogOut, UserCircle2 } from 'lucide-react'

export default async function AuthButton() {
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const signOut = async () => {
		'use server'

		const supabase = createClient()
		await supabase.auth.signOut()
		return redirect('/')
	}

	return user ? (
		<div className="flex items-center gap-4">
			<Link href="/user">Hey, {user.email}!</Link>
			<form action={signOut}>
				<Button size={'icon'} variant={'outline'}>
					<LogOut strokeWidth={1.5} />
				</Button>
			</form>
		</div>
	) : (
		<Button variant={'outline'} size={'icon'} asChild>
			<Link href="/login">
				<UserCircle2 strokeWidth={1.5} />
			</Link>
		</Button>
	)
}
