import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Login({
	searchParams,
}: {
	searchParams: { message: string }
}) {
	const signIn = async (formData: FormData) => {
		'use server'

		const email = formData.get('email') as string
		const supabase = createClient()

		const { error } = await supabase.auth.resetPasswordForEmail(email)

		if (error) {
			return redirect('/login?message=Could send rset link')
		}

		return redirect('/')
	}

	return (
		<form className="space-y-4">
			<div>
				<h1 className="text-2xl">Forgot Password?</h1>
				<p>Please enter email adress.</p>
			</div>

			<div className="flex gap-2">
				<Input
					name="email"
					type="email"
					placeholder="you@example.com"
					required
				/>
				<SubmitButton formAction={signIn} pendingText="Sending link...">
					Send Instructions
				</SubmitButton>
			</div>

			<div>
				Remembered your password?{' '}
				<Link href={'/login'} className="hover:text-primary">
					Login.
				</Link>
			</div>

			{searchParams?.message && (
				<p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
					{searchParams.message}
				</p>
			)}
		</form>
	)
}
