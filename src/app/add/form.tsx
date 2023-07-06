'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import slugify from '@/utils/slugify'

export default function AddPost() {
	const titleRef = useRef<HTMLInputElement>(null)
	const authorRef = useRef<HTMLInputElement>(null)
	const yearRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLTextAreaElement>(null)

	const [formError, setFormError] = useState(false)
	const [dbError, setDbError] = useState(false)

	const supabase = createClientComponentClient()
	const router = useRouter()

	const handleSubmit = async () => {
		if (
			!titleRef.current?.value ||
			!authorRef.current?.value ||
			!yearRef.current?.value ||
			!contentRef.current?.value
		) {
			return setFormError(true)
		}

		setFormError(false)
		setDbError(false)

		const { data, error } = await supabase
			.from('posts')
			.insert({
				title: titleRef.current?.value,
				author: authorRef.current?.value,
				year: yearRef.current?.value,
				slug: slugify(titleRef.current?.value!),
				content: contentRef.current?.value,
			})
			.select('slug')
			.single()

		if (error) {
			return setDbError(true)
		}

		router.push(`/post/${data.slug}`)
		return router.refresh()
	}

	return (
		<div className="w-full space-y-4">
			<input
				ref={titleRef}
				type="text"
				name="title"
				placeholder="Title"
				className="w-full rounded-2xl bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
			/>
			<div className="flex flex-col gap-4 md:flex-row">
				<input
					ref={authorRef}
					type="text"
					name="author"
					placeholder="Author"
					className="w-full rounded-2xl bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
				/>
				<input
					ref={yearRef}
					type="text"
					name="year"
					placeholder="Year"
					className="w-full rounded-2xl bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800 md:w-1/3"
				/>
			</div>
			<textarea
				ref={contentRef}
				placeholder="Content"
				rows={16}
				className="w-full rounded-2xl bg-gray-100 px-4 py-2  focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
			></textarea>
			{formError && (
				<div className="flex items-center gap-1 text-red-500">
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
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
					Not everything is filled!
				</div>
			)}
			{dbError && (
				<div className="flex items-center gap-1 text-red-500">
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
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</svg>
					Failed inserting data
				</div>
			)}
			<button
				onClick={handleSubmit}
				className="flex items-center gap-2 rounded-2xl border-2 border-gray-300 px-4 py-2 hover:border-fuchsia-700 dark:border-gray-800 dark:hover:border-fuchsia-700"
			>
				Save
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-gray-800 dark:text-gray-200"
				>
					<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
					<polyline points="17 21 17 13 7 13 7 21" />
					<polyline points="7 3 7 8 15 8" />
				</svg>
			</button>
		</div>
	)
}
