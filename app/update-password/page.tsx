import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'

export default function UpdatePassword({
	searchParams,
}: {
	searchParams: { message: string }
}) {
	const UpdatePassword = async (formData: FormData) => {
		'use server'

		const password = formData.get('password') as string
		const supabase = createClient()

		const { error } = await supabase.auth.updateUser({
			password,
		})

		if (error) {
			return redirect('/update-password?message=Could not update password')
		}

		return redirect('/')
	}

	return (
		<form className="space-y-4">
			<div>
				<h1 className="text-2xl">Update password</h1>
				<p>Please enter new password. Min. 6 characters long.</p>
			</div>

			<div className="flex gap-2">
				<Input
					name="password"
					type="password"
					placeholder="••••••••"
					required
				/>

				<SubmitButton
					formAction={UpdatePassword}
					pendingText="Changing password..."
				>
					Update
				</SubmitButton>
			</div>

			{searchParams?.message && (
				<p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
					{searchParams.message}
				</p>
			)}
		</form>
	)
}
