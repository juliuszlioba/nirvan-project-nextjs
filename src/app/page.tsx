import ListItem from '@/components/list-item'
import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

// do not cache this page
export const revalidate = 0

export default async function Home() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data } = await supabase
		.from('posts')
		.select(`id, year, author, title, slug`)
		.order('id', { ascending: false })

	return (
		<main
			className={`mx-auto flex min-h-screen max-w-4xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<div className="pb-4 dark:border-gray-800">
				<div className="flex items-center gap-2 pb-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.75}
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-10 w-10"
					>
						<path d="m16 6 4 14" />
						<path d="M12 6v14" />
						<path d="M8 8v12" />
						<path d="M4 4v16" />
					</svg>

					{/* <p className="text-3xl">short stories</p> */}
					<p className="text-3xl">SFFBC</p>
				</div>
				<p className=" tracking-wide">
					Welcome to the Science Fiction & Fantasy Book Club, where you&apos;ll
					find an exhilarating collection of short stories that will transport
					you to new dimensions, challenge your perceptions, and leave you
					craving more.
				</p>
			</div>

			{data && session && (
				<div className="grid divide-y-2 divide-dashed divide-gray-300 dark:divide-gray-700">
					{data?.map((item, index) => {
						return <ListItem key={index} item={item} />
					})}
				</div>
			)}
		</main>
	)
}
