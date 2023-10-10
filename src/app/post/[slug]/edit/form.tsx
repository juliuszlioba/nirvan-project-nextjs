'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dialog, Transition } from '@headlessui/react'
import slugify from '@/lib/slugify'
import { toInt } from 'radash'
import Link from 'next/link'
import { Trash2, Save, HelpCircle, Files } from 'lucide-react'

export default function EditPost({
	post,
}: {
	post: {
		author: string
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
	const [author, setAuthor] = useState(post?.author || undefined)
	const [year, setYear] = useState<number | string | undefined>(
		post?.year || undefined
	)
	const [content, setContent] = useState(post?.content || undefined)

	const [formError, setFormError] = useState(false)
	const [dbError, setDbError] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)

	const supabase = createClientComponentClient()
	const router = useRouter()

	function closeModal() {
		setDeleteModal(false)
	}

	function openModal() {
		setDeleteModal(true)
	}

	const handleDelete = async () => {
		if (!post) {
			return setDbError(true)
		}

		const { data, error } = await supabase
			.from('posts')
			.delete()
			.eq('id', post.id)

		setDeleteModal(false)

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
		console.log({ title, author, year, content })

		setFormError(false)
		setDbError(false)

		if (!post) {
			return setDbError(true)
		}

		const { data, error } = await supabase
			.from('posts')
			.update({
				title,
				author,
				year,
				slug: slugify(title!),
				content,
			})
			.eq('id', post.id)
			.select('slug')
			.single()

		if (error) {
			return setDbError(true)
		}

		router.push(`/post/${post.slug}`)
		return router.refresh()
	}

	if (!post) {
		return <div>Empty</div>
	}

	return (
		<div className="w-full space-y-4">
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={title || undefined}
				onChange={(event) => setTitle(event.currentTarget.value)}
				className="input w-full"
			/>

			<div className="flex flex-col gap-4 md:flex-row">
				<input
					type="text"
					name="author"
					placeholder="Author"
					value={author || undefined}
					onChange={(event) => setAuthor(event.currentTarget.value)}
					className="input w-full"
				/>
				<input
					type="text"
					name="year"
					placeholder="Year"
					value={year}
					maxLength={4}
					onChange={(event) => handleYearSet(event.currentTarget.value)}
					className="input w-full md:w-1/3"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<textarea
					placeholder="Content"
					rows={16}
					value={content || undefined}
					onChange={(event) => setContent(event.currentTarget.value)}
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
					Action Failed!
				</div>
			)}

			<div className="flex items-center justify-between gap-2">
				<button onClick={handleSubmit} className="button">
					Save
					<Save strokeWidth={1.5} />
				</button>

				<button onClick={openModal} className="button text-red-700">
					Delete
					<Trash2 strokeWidth={1.5} />
				</button>
			</div>

			<Transition appear show={deleteModal} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-gray-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
									<Dialog.Title
										as="h3"
										className="text-2xl font-medium leading-6 text-gray-900 dark:text-gray-200"
									>
										Are you sure?
									</Dialog.Title>
									<div className="mt-2">
										<p>
											Delete process is{' '}
											<span className="text-red-600">ireversable</span>.
										</p>
									</div>

									<div className="mt-4 flex gap-2">
										<button
											type="button"
											className="button"
											onClick={closeModal}
										>
											Cancel
										</button>
										<button
											type="button"
											className="button text-red-600 hover:border-red-600 hover:text-red-600 dark:border-red-800 dark:hover:border-red-600"
											onClick={handleDelete}
										>
											Confirm
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}
