import supabaseServerClient from '@/lib/supabase'
import ListItem from '@/components/ListItem'
import { Library } from 'lucide-react'

// do not cache this page
export const revalidate = 0

export default async function Home() {
	const supabase = await supabaseServerClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	const { data: user } = await supabase
		.from('users')
		.select('permission')
		.eq('id', session?.user.id as string)
		.single()

	const { data } = await supabase
		.from('posts')
		.select(`id, year, author, title, slug`)
		.order('id', { ascending: false })

	return (
		<main
			className={`mx-auto flex max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<div className="border-gray pb-4">
				<div className="flex items-center gap-2 pb-2">
					<Library strokeWidth={1.5} className="h-10 w-10" />
					<p className="text-3xl">SFFBC</p>
				</div>
				{/* <p className="tracking-wide">
					Welcome to the Science Fiction & Fantasy Book Club, where you&apos;ll
					find an exhilarating collection of short stories that will transport
					you to new dimensions, challenge your perceptions, and leave you
					craving more.
				</p> */}
			</div>

			{session && user?.permission !== 'SUBSCRIBER' && data && (
				<div className="grid divide-y-2 divide-dashed divide-gray-light">
					{data?.map((item, index) => {
						return <ListItem key={index} item={item} />
					})}
				</div>
			)}
		</main>
	)
}
