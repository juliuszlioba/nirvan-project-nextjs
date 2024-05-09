import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AddPost from './form'

// do not cache this page
export const revalidate = 0

export const metadata: Metadata = {
	title: 'Add new Story',
}

export default async function Page() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data: userRoles } = await supabase
		.from('users')
		.select('permission')
		.eq('id', user?.id as string)
		.single()

	if (!user) {
		redirect('/')
	}

	if (user && userRoles?.permission !== 'SUBSCRIBER') {
		return (
			<div className="space-y-4">
				<AddPost />
			</div>
		)
	} else {
		redirect('/')
	}
}
