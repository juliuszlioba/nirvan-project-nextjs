import type { Metadata } from 'next'
import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import getConfig from 'next/config'

export const metadata: Metadata = {
	title: 'Change Password',
}

export default async function Page() {
	const { publicRuntimeConfig } = getConfig()
	const version = publicRuntimeConfig?.version

	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/register')
	}

	const { data: users } = await supabase
		.from('users')
		.select('permission')
		.eq('id', user.id)
		.single()

	return (
		<main
			className={`mx-auto flex h-full max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<h1 className="text-3xl">User</h1>
			<div>
				<p>Email: {user.email}</p>
				<p>Permission: {users?.permission}</p>
			</div>
			<div>
				<Link href="/update-password" className="button">
					Change Password
				</Link>
			</div>
			<div className="border-gray text-gray mt-16 border-t-2 border-dashed py-2">
				Website Version: {version}
			</div>
		</main>
	)
}
