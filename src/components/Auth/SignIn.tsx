'use client'

import type { Database } from '@/lib/database.types'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import cn from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import * as Yup from 'yup'

const SignInSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().required('Required'),
})

interface SignInFormValues {
	email: string
	password: string
}

const SignIn = () => {
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormValues>({
		resolver: yupResolver(SignInSchema),
	})

	const onSubmit: SubmitHandler<SignInFormValues> = (data) => signIn(data)

	async function signIn(formData: SignInFormValues) {
		const { error } = await supabase.auth.signInWithPassword({
			email: formData.email,
			password: formData.password,
		})

		if (error) {
			setErrorMsg(error.message)
		}
	}

	return (
		<div className="card">
			<h2 className="text-3xl">Login</h2>
			<p>Please enter your credentials.</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col items-start gap-2 sm:flex-row"
			>
				<div className="w-full">
					<input
						{...register('email')}
						placeholder="Email"
						className={cn('input', 'w-full', errors.email && 'input-error')}
					/>
					{errors.email ? (
						<div className="text-red-600">{errors.email.message}</div>
					) : null}
				</div>

				<div className="w-full">
					<input
						{...register('password')}
						placeholder="Password"
						type="password"
						className={cn('input', 'w-full', errors.password && 'input-error')}
					/>
					{errors.password ? (
						<div className="text-red-600">{errors.password.message}</div>
					) : null}
				</div>

				<button className="button max-sm:w-full" type="submit">
					Login
				</button>
			</form>

			{errorMsg && <div className="text-red-600">{errorMsg}</div>}

			<div className="w-full pt-4">
				<Link href="/reset-password" className="link inline-flex gap-2 text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-6 w-6 shrink-0"
					>
						<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
						<circle cx="16.5" cy="7.5" r=".5" />
					</svg>
					Forgot your password?
				</Link>
			</div>

			{/* <div className="border-t-2 dark:border-gray border-gray pt-4 w-full text-center">
				<Link href="/sign-up" className="link w-full">
					Don&apos;t have an account? Sign Up.
				</Link>
			</div> */}
		</div>
	)
}

export default SignIn
