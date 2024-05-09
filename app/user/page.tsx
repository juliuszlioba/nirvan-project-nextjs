import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import getConfig from 'next/config'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
	title: 'User',
}

export default async function UserPage() {
	const { publicRuntimeConfig } = getConfig()
	const version = publicRuntimeConfig?.version
	const supabase = createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/login')
	}

	const { data: usersRole } = await supabase
		.from('users')
		.select('permission')
		.eq('id', user.id)
		.single()

	const userPermision = () => {
		if (usersRole?.permission === 'ADMIN') {
			return 'administrator rights'
		}
		if (usersRole?.permission === 'USER') {
			return 'read and add stories'
		}
		return 'none'
	}

	return (
		<div className="flex flex-col gap-2">
			<div>
				<p>Email: {user.email}</p>
				<p>Permission: {userPermision()}</p>
			</div>
			<div>
				<Button asChild variant={'outline'}>
					<Link href="/update-password" className="button">
						Change Password
					</Link>
				</Button>
			</div>
			<div className="mt-8 border-t-2 border-dashed pt-4">
				Website Version: {version}
			</div>
		</div>
	)
}
