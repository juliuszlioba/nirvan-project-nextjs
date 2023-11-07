'use client'

import type { Database } from '@/lib/database.types'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import cn from 'classnames'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

const UpdatePasswordSchema = Yup.object().shape({
	password: Yup.string().required('Required'),
})

interface UpdatePasswordFormValues {
	password: string
}

const UpdatePassword = () => {
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
	const router = useRouter()
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<UpdatePasswordFormValues>({
		resolver: yupResolver(UpdatePasswordSchema),
	})

	const onSubmit: SubmitHandler<UpdatePasswordFormValues> = (data) =>
		updatePassword(data)

	async function updatePassword(formData: UpdatePasswordFormValues) {
		const { error } = await supabase.auth.updateUser({
			password: formData.password,
		})

		if (error) {
			setErrorMsg(error.message)
		} else {
			// Go to Home page
			router.replace('/')
		}
	}

	return (
		<div className="card">
			<h2 className="text-3xl">Update Password?</h2>
			<p>Please enter new password</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col items-start gap-2 sm:flex-row"
			>
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
					Submit
				</button>
			</form>

			{errorMsg && <div className="text-red-600">{errorMsg}</div>}
		</div>
	)
}

export default UpdatePassword
