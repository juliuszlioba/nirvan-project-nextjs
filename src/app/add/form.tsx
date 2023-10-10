'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import slugify from '@/lib/slugify'
import Link from 'next/link'
import { Files, HelpCircle, Save } from 'lucide-react'

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
				className="input w-full"
			/>

			<div className="flex flex-col gap-4 md:flex-row">
				<input
					ref={authorRef}
					type="text"
					name="author"
					placeholder="Author"
					className="input w-full"
				/>
				<input
					ref={yearRef}
					type="text"
					name="year"
					placeholder="Year"
					className="input w-full md:w-1/3"
				/>
			</div>

			<div className="space-y-4">
				<textarea
					ref={contentRef}
					placeholder="Content"
					rows={16}
					className="input z-10 w-full"
				></textarea>

				<div className="flex items-center gap-2">
					<Link href="/docs/post-formating" target="_blank" className="button">
						Open post formating help
						<HelpCircle strokeWidth={1.5} />
					</Link>
					<Link
						href="https://word2md.com/"
						target="_blank"
						rel="nofollow noopener noreferrer"
						className="button"
					>
						.docx to .md converter
						<Files strokeWidth={1.5} />
					</Link>
				</div>
			</div>

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
			<button onClick={handleSubmit} className="button">
				Save
				<Save strokeWidth={1.5} />
			</button>
		</div>
	)
}
