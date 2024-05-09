import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { LogOut, UserCircle2 } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

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
			<TooltipProvider>
				<Tooltip delayDuration={0}>
					<TooltipTrigger asChild>
						<div>
							<Link href="/user">Hey, {user.email}!</Link>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>User Profile</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<form action={signOut}>
				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<Button size={'icon'} variant={'outline'}>
									<LogOut strokeWidth={1.5} />
								</Button>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Logout</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</form>
		</div>
	) : (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<div>
						<Button variant={'outline'} size={'icon'} asChild>
							<Link href="/login">
								<UserCircle2 strokeWidth={1.5} />
							</Link>
						</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Login</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
