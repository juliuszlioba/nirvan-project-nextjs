'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import slugify from '@/lib/slugify'
import Link from 'next/link'
import { toInt } from 'radash'
import { Files, HelpCircle, Save, Images } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function AddPost() {
	const titleRef = useRef<HTMLInputElement>(null)
	const authorLastNameRef = useRef<HTMLInputElement>(null)
	const authorFirstNameRef = useRef<HTMLInputElement>(null)
	const yearRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLTextAreaElement>(null)

	const [formError, setFormError] = useState(false)
	const [dbError, setDbError] = useState(false)

	const supabase = createClient()
	const router = useRouter()

	const handleSubmit = async () => {
		if (
			!titleRef.current?.value ||
			!authorLastNameRef.current?.value ||
			!authorFirstNameRef.current?.value ||
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
				author_last_name: authorLastNameRef.current?.value,
				author_first_name: authorFirstNameRef.current?.value,
				year: toInt(yearRef.current?.value),
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
			<Input
				ref={titleRef}
				type="text"
				name="title"
				placeholder="Title"
				className="w-full"
			/>

			<div className="flex flex-col gap-4 md:flex-row">
				<Input
					ref={authorFirstNameRef}
					type="text"
					name="author"
					placeholder="Author First Name"
					className="w-full"
				/>
				<Input
					ref={authorLastNameRef}
					type="text"
					name="author"
					placeholder="Author Last Name"
					className="w-full"
				/>
				<Input
					ref={yearRef}
					type="text"
					name="year"
					placeholder="Year"
					className="w-full md:w-1/3"
				/>
			</div>

			<div className="space-y-4">
				<Textarea
					ref={contentRef}
					placeholder="Content"
					rows={16}
					className="input z-10 w-full"
				></Textarea>

				<div className="flex flex-wrap items-center gap-2 border-b-2 border-dashed pb-4">
					<Button variant={'outline'} className="gap-1" asChild>
						<Link href="/uploads" target="_blank" className="button">
							Image assets
							<Images strokeWidth={1.5} />
						</Link>
					</Button>
					<Button variant={'outline'} className="gap-1" asChild>
						<Link
							href="/docs/post-formating"
							target="_blank"
							className="button"
						>
							Open post formating help
							<HelpCircle strokeWidth={1.5} />
						</Link>
					</Button>
					<Button variant={'outline'} className="gap-1" asChild>
						<Link
							href="https://word2md.com/"
							target="_blank"
							rel="nofollow noopener noreferrer"
							className="button"
						>
							.docx to .md converter
							<Files strokeWidth={1.5} />
						</Link>
					</Button>
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
			<div className="flex items-center justify-between gap-2">
				<Button variant={'outline'} className="gap-1" onClick={handleSubmit}>
					Save
					<Save strokeWidth={1.5} />
				</Button>
			</div>
		</div>
	)
}
