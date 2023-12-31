'use client'

import type { Database } from '@/lib/database.types'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import cn from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import * as Yup from 'yup'

const SignUpSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
})

interface SignUpFormValues {
	email: string
	password: string
}

const SignUp = () => {
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
	} = useForm<SignUpFormValues>({
		resolver: yupResolver(SignUpSchema),
	})

	const onSubmit: SubmitHandler<SignUpFormValues> = (data) => signUp(data)

	async function signUp(formData: SignUpFormValues) {
		const { error } = await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
			// redirectTo: `${window.location.origin}/auth/callback`,
		})

		if (error) {
			setErrorMsg(error.message)
		} else {
			setSuccessMsg('Success!')
		}
	}

	return (
		<div className="card">
			<h2 className="text-3xl">Create Account</h2>

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

				<div className="w-full">
					<input
						{...register('password')}
						placeholder="min 6 characters"
						type="password"
						className={cn('input', 'w-full', errors.password && 'input-error')}
					/>
					{errors.password ? (
						<div className="text-red-600">{errors.password.message}</div>
					) : null}
				</div>

				<button className="button max-sm:w-full" type="submit">
					Register
				</button>
			</form>

			{errorMsg && <div className="text-red-600">{errorMsg}</div>}
			{successMsg && (
				<div className="text-blue-700 dark:text-blue-700">{successMsg}</div>
			)}

			<div className="w-full pt-4">
				<Link href="/login" className="link inline-flex gap-2">
					Already have an account? Sign In.
				</Link>
			</div>
		</div>
	)
}

export default SignUp
