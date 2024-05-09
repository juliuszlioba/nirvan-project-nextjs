import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { KeyRound } from 'lucide-react'

export default function Login({
	searchParams,
}: {
	searchParams: { message: string }
}) {
	const signIn = async (formData: FormData) => {
		'use server'

		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const supabase = createClient()

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			return redirect('/login?message=Could not authenticate user')
		}

		return redirect('/')
	}

	return (
		<form className="space-y-4">
			<div>
				<h1 className="text-2xl">Login</h1>
				<p>Please enter your credentials.</p>
			</div>

			<div className="flex gap-2">
				<Input
					name="email"
					type="email"
					placeholder="you@example.com"
					required
				/>
				<Input
					name="password"
					type="password"
					placeholder="••••••••"
					required
				/>

				<SubmitButton formAction={signIn} pendingText="Signing In...">
					Sign In
				</SubmitButton>
			</div>

			<div>
				<Button asChild variant={'ghost'}>
					<Link href="/reset-password" className="gap-2">
						<KeyRound strokeWidth={1.5} />
						Forgot your password?
					</Link>
				</Button>
			</div>

			{searchParams?.message && (
				<p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
					{searchParams.message}
				</p>
			)}
		</form>
	)
}
