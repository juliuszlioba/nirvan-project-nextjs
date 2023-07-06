import type { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

// do not cache this page
export const revalidate = 0

export default async function Home() {
	const supabase = createServerComponentClient<Database>({ cookies })
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

					<p className="text-3xl">short stories</p>
				</div>
				<p className=" tracking-wide">
					Welcome to my website, where you&apos;ll find an exhilarating
					collection of short stories that will transport you to new dimensions,
					challenge your perceptions, and leave you craving more.
				</p>
			</div>

			{data && (
				<div className="grid divide-y-2 divide-dashed divide-gray-300 dark:divide-gray-700">
					{data?.map((item) => {
						return (
							<div key={item.id} className="flex items-center gap-2 py-4">
								<div className="grid">
									<Link
										href={`/post/${item.slug}`}
										className="text-2xl hover:text-fuchsia-700"
									>
										{item.title}
									</Link>
									<span>
										by {item.author}, year {item.year}
									</span>
								</div>

								<Link
									href={`/post/${item.slug}`}
									className="ml-auto flex items-center gap-2 text-lg hover:text-fuchsia-700"
								>
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
											d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
										/>
									</svg>
									Read
								</Link>
							</div>
						)
					})}
				</div>
			)}
		</main>
	)
}
