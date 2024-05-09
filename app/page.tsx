import { Library } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import ListItem from '@/components/list-item'

export default async function Home() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return (
			<div className="flex items-start justify-center gap-2">
				<Library strokeWidth={1.5} className="h-10 w-10 shrink-0" />
				<p className="text-4xl font-light">
					Science Fiction & Fantasy Book Club
				</p>
			</div>
		)
	}

	const { data: posts } = await supabase
		.from('posts')
		.select(`id, year, author_last_name, author_first_name, title, slug`)
		.order('author_last_name', { ascending: true })

	interface Post {
		id: number
		year: number
		author: string
		title: string
		slug: string
	}

	interface GroupedBook {
		author: string
		posts: {
			id: number
			year: number
			title: string
			slug: string
		}[]
	}

	const groupAndSortByAuthorAndYear = (books: Post[]): GroupedBook[] => {
		const groupedBooks: { [author: string]: Post[] } = {}

		books.forEach((book) => {
			if (!groupedBooks[book.author]) {
				groupedBooks[book.author] = []
			}
			groupedBooks[book.author].push(book)
		})

		const groupedAndSortedBooks: GroupedBook[] = []

		for (const author in groupedBooks) {
			const posts = groupedBooks[author].map(({ id, year, title, slug }) => ({
				id,
				year,
				title,
				slug,
			}))
			posts.sort((a, b) => b.year - a.year)

			groupedAndSortedBooks.push({
				author,
				posts,
			})
		}

		return groupedAndSortedBooks
	}

	const postWithFullName: Post[] | undefined = posts?.map((post) => ({
		...post,
		author: `${post.author_last_name}, ${post.author_first_name}`,
	}))

	const groupedData =
		postWithFullName && groupAndSortByAuthorAndYear(postWithFullName)

	return (
		<>
			<div className="mb-12 flex items-start justify-start gap-2">
				<Library strokeWidth={1.5} className="h-10 w-10 shrink-0" />
				<p className="text-4xl font-light">
					Science Fiction & Fantasy Book Club
				</p>
			</div>

			{groupedData && (
				<div className="grid">
					{groupedData.map((postAuthor, index) => {
						return (
							<div key={index} className="pb-8">
								<h2 className="mb-2 text-xl font-medium">
									{postAuthor.author}
								</h2>
								<div className="grid gap-2">
									{postAuthor.posts.map((post, index) => (
										<ListItem key={index} {...post} />
									))}
								</div>
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}
