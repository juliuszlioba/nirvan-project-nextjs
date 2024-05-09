import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next'
import EditPost from './form'
import { redirect } from 'next/navigation'
import PreviewPost from '@/components/preview-post'

// do not cache this page
export const revalidate = 0

export const metadata: Metadata = {
	title: 'Editing Story',
}

export default async function Page({ params }: { params: { slug: string } }) {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data: userRoles } = await supabase
		.from('users')
		.select('permission')
		.eq('id', user?.id as string)
		.single()

	const { data } = await supabase
		.from('posts')
		.select('*')
		.eq('slug', params.slug)
		.limit(1)
		.single()

	if (!data) {
		return redirect('/')
	}

	if (user?.id !== data.user_id) {
		return redirect('/')
	}

	return (
		<div className="space-y-4 pb-4">
			<EditPost post={data} />
			<PreviewPost post={data} />
		</div>
	)
}
