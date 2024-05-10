import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		redirect('/')
	}

	return (
		<main className="text-center">
			<h2 className="text-3xl">404 error</h2>
			<p>Page you are looking for is nowhere to be found.</p>
			<div>
				<Button className="button mt-4" variant={'outline'} asChild>
					<Link href={'/'}>Go Home</Link>
				</Button>
			</div>
		</main>
	)
}
