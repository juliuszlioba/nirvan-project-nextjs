'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import slugify from '@/lib/slugify'
import { toInt } from 'radash'
import Link from 'next/link'
import { Trash2, Save, HelpCircle, Files, Images, Sparkles } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export default function EditPost({
	post,
}: {
	post: {
		author_last_name: string
		author_first_name: string
		content: string
		createdat: string
		id: number
		slug: string
		title: string
		updatedat: string
		user_id: string | null
		year: number
	} | null
}) {
	const [title, setTitle] = useState(post?.title || undefined)
	const [authorLastName, setAuthorLastName] = useState(
		post?.author_last_name || undefined
	)
	const [authorFirstName, setAuthorFirstName] = useState(
		post?.author_first_name || undefined
	)
	const [year, setYear] = useState<number | string | undefined>(
		post?.year || undefined
	)
	const [content, setContent] = useState(post?.content || undefined)

	const [formError, setFormError] = useState(false)
	const [dbError, setDbError] = useState(false)

	const supabase = createClient()
	const router = useRouter()

	const handleDelete = async () => {
		if (!post) {
			return setDbError(true)
		}

		const { data, error } = await supabase
			.from('posts')
			.delete()
			.eq('id', post.id)

		if (error) {
			return setDbError(true)
		}

		router.push(`/`)
		return router.refresh()
	}

	const handleYearSet = (value: string) => {
		const valueNumber = toInt(value)

		if (valueNumber === 0) {
			return setYear('')
		} else {
			return setYear(valueNumber)
		}
	}

	const handleSubmit = async () => {
		setFormError(false)
		setDbError(false)

		if (!post) {
			return setDbError(true)
		}

		const { data, error } = await supabase
			.from('posts')
			.update({
				title,
				author_last_name: authorLastName,
				author_first_name: authorFirstName,
				year: toInt(year) || undefined,
				slug: slugify(title!),
				content,
			})
			.eq('id', post.id)
			.select('slug')
			.single()

		if (error) {
			return setDbError(true)
		}

		router.refresh()
		return
	}

	const handleSave = async () => {
		setFormError(false)
		setDbError(false)

		if (!post) {
			return setDbError(true)
		}

		await handleSubmit()
		router.push(`/post/${post.slug}`)
		router.refresh()
	}

	if (!post) {
		return <div>Empty</div>
	}

	return (
		<div className="w-full space-y-4">
			<Input
				type="text"
				name="title"
				placeholder="Title"
				value={title || undefined}
				onChange={(event) => setTitle(event.currentTarget.value)}
				className="w-full"
			/>

			<div className="flex flex-col gap-4 md:flex-row">
				<Input
					type="text"
					name="author"
					placeholder="Author First Name"
					value={authorLastName || undefined}
					onChange={(event) => setAuthorLastName(event.currentTarget.value)}
					className="w-full"
				/>
				<Input
					type="text"
					name="author"
					placeholder="Author Last name"
					value={authorFirstName || undefined}
					onChange={(event) => setAuthorFirstName(event.currentTarget.value)}
					className="w-full"
				/>
				<Input
					type="text"
					name="year"
					placeholder="Year"
					value={year}
					maxLength={4}
					onChange={(event) => handleYearSet(event.currentTarget.value)}
					className="w-full md:w-1/3"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<Textarea
					placeholder="Content"
					rows={16}
					value={content || undefined}
					onChange={(event) => setContent(event.currentTarget.value)}
					className="z-10 w-full text-base"
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
					Action Failed!
				</div>
			)}

			<div className="flex items-center justify-between gap-2">
				<Button variant={'outline'} onClick={handleSubmit} className="gap-1">
					Preview
					<Sparkles strokeWidth={1.5} />
				</Button>

				<Button
					variant={'outline'}
					onClick={handleSave}
					className="mr-auto gap-1"
				>
					Save
					<Save strokeWidth={1.5} />
				</Button>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant={'outline'} className="gap-1 text-red-700">
							Delete
							<Trash2 strokeWidth={1.5} />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
						</DialogHeader>

						<div>
							This action will permanently delete post from server. Delete
							process is{' '}
							<span className="font-semibold text-red-600">ireversable</span>.
						</div>

						<div className="flex justify-between gap-2">
							<Button variant={'destructive'} onClick={handleDelete}>
								Delete
							</Button>
							<DialogClose asChild>
								<Button variant={'outline'}>Cancel</Button>
							</DialogClose>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
