import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { FilePlus, Library } from 'lucide-react'
import Link from 'next/link'
import AuthButton from '@/components/auth-button'
import { createClient } from '@/utils/supabase/server'

export default async function Header() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data: userRoles } = await supabase
		.from('users')
		.select('permission')
		.eq('id', user?.id as string)
		.single()

	return (
		<div className="px-4">
			<div className="mx-auto flex max-w-5xl items-center justify-between border-b-2 border-dashed py-4">
				<div className="flex gap-2">
					<Button variant={'ghost'} size={'icon'} asChild>
						<Link href={'/'}>
							<Library strokeWidth={1.5} />
						</Link>
					</Button>
					{user &&
						(userRoles?.permission === 'USER' ||
							userRoles?.permission === 'ADMIN') && (
							<Button variant={'outline'} asChild>
								<Link href={'/add'} className="gap-1">
									<FilePlus strokeWidth={1.5} />
									<span className="max-sm:hidden">Add Story</span>
								</Link>
							</Button>
						)}
				</div>
				<div className="flex gap-2">
					<AuthButton />
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
