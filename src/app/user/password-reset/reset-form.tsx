'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	Session,
	createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database.types'

export default function LoginForm() {
	const passwordRef = useRef<HTMLInputElement>(null)
	const passwordRepeatRef = useRef<HTMLInputElement>(null)

	const supabase = createClientComponentClient<Database>()
	const router = useRouter()

	const [formError, setFormError] = useState('')

	const handlePassChange = async () => {
		if (!passwordRef.current?.value || !passwordRepeatRef.current?.value) {
			return setFormError('Empty input')
		}

		if (passwordRef.current?.value === passwordRepeatRef.current?.value) {
			const { error } = await supabase.auth.updateUser({
				password: passwordRef.current?.value,
			})

			if (error) {
				return setFormError(error.message)
			}

			router.push(`/user`)
			return router.refresh()
		}
	}

	return (
		<div className="w-full space-y-4">
			{formError && (
				<div className="flex items-center gap-1 text-red-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
					{formError}
				</div>
			)}
			<div className="flex flex-col gap-4 md:flex-row">
				<input
					ref={passwordRepeatRef}
					type="password"
					name="newpassword"
					placeholder="new password"
					className="w-full rounded-2xl bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
				/>
				<input
					ref={passwordRef}
					type="password"
					name="newpasswordrepeat"
					placeholder="new password repeat"
					className="w-full rounded-2xl bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
				/>
				<button
					onClick={handlePassChange}
					className="flex items-center gap-2 rounded-2xl border-2 border-gray-300 px-4 py-2 hover:border-fuchsia-700 dark:border-gray-800 dark:hover:border-fuchsia-700"
				>
					Login
				</button>
			</div>
		</div>
	)
}
