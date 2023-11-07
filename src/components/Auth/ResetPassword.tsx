'use client'

import type { Database } from '@/lib/database.types'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import cn from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import * as Yup from 'yup'

const ResetPasswordSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
})

interface ResetPasswordFormValues {
	email: string
}

const ResetPassword = () => {
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [successMsg, setSuccessMsg] = useState<string | null>(null)

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ResetPasswordFormValues>({
		resolver: yupResolver(ResetPasswordSchema),
	})

	const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) =>
		resetPassword(data)

	async function resetPassword(formData: ResetPasswordFormValues) {
		const { error } = await supabase.auth.resetPasswordForEmail(
			formData.email,
			{
				redirectTo: `${window.location.origin}/auth/update-password`,
			}
		)

		if (error) {
			setErrorMsg(error.message)
		} else {
			setSuccessMsg('Password reset instructions sent.')
		}
	}

	return (
		<div className="card">
			<h2 className="text-3xl">Forgot Password?</h2>
			<p>Please enter email adress.</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col items-start gap-2 sm:flex-row"
			>
				<div className="w-full">
					<input
						{...register('email')}
						placeholder="email@adress.com"
						className={cn('input', 'w-full', errors.email && 'input-error')}
					/>
					{errors.email ? (
						<div className="text-red-600">{errors.email.message}</div>
					) : null}
				</div>

				<button
					className="button whitespace-nowrap max-sm:w-full"
					type="submit"
				>
					Send Instructions
				</button>
			</form>

			{errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
			{successMsg && (
				<div className="text-blue-700 dark:text-blue-700">{successMsg}</div>
			)}

			<div className="w-full pt-4">
				<Link href="/login" className="link">
					Remember your password? Login.
				</Link>
			</div>
		</div>
	)
}

export default ResetPassword
