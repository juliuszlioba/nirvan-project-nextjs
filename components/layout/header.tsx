import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { FilePlus, Library } from 'lucide-react'
import Link from 'next/link'
import AuthButton from '@/components/auth-button'
import { createClient } from '@/utils/supabase/server'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

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
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-2 border-b-2 border-dashed py-4">
				<div className="flex items-center gap-2">
					{user &&
					(userRoles?.permission === 'USER' ||
						userRoles?.permission === 'ADMIN') ? (
						<>
							<TooltipProvider>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<div>
											<Button variant={'ghost'} size={'icon'} asChild>
												<Link href={'/'} className="gap-1">
													<Library strokeWidth={1.5} />
												</Link>
											</Button>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>Posts List</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<div>
											<Button variant={'outline'} size={'icon'} asChild>
												<Link href={'/add'} className="gap-1">
													<FilePlus strokeWidth={1.5} />
												</Link>
											</Button>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>Add New Story</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</>
					) : (
						<div className="flex items-center gap-1">
							<Library strokeWidth={1.5} />
							<span className="text-xl">SFFBC</span>
						</div>
					)}
				</div>
				<div className="flex items-center gap-2">
					<AuthButton />
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}
