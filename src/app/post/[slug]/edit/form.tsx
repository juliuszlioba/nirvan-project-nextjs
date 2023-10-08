'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import slugify from '@/utils/slugify'
import { toInt } from 'radash'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'

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
				className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
			/>
			<div className="flex flex-col gap-4 md:flex-row">
				<input
					type="text"
					name="author"
					placeholder="Author"
					value={author || undefined}
					onChange={(event) => setAuthor(event.currentTarget.value)}
					className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
				/>
				<input
					type="text"
					name="year"
					placeholder="Year"
					value={year}
					maxLength={4}
					onChange={(event) => handleYearSet(event.currentTarget.value)}
					className="w-full rounded-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800 md:w-1/3"
				/>
			</div>

			<div className="flex flex-col">
				<textarea
					placeholder="Content"
					rows={16}
					value={content || undefined}
					onChange={(event) => setContent(event.currentTarget.value)}
					className="z-10 w-full rounded-t-lg bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-fuchsia-700 focus-visible:outline-none dark:bg-gray-800"
				></textarea>
				<div className="rounded-b-lg border-t-2 border-dashed border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-800">
					<div className="flex items-center">
						<Link
							href="/docs/post-formating"
							target="_blank"
							className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 hover:border-fuchsia-700 dark:border-gray-700 dark:hover:border-fuchsia-700"
						>
							Open post formating help
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
								/>
							</svg>
						</Link>
					</div>
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
				<button
					onClick={handleSubmit}
					className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 hover:border-fuchsia-700 dark:border-gray-800 dark:hover:border-fuchsia-700"
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

				<button
					onClick={openModal}
					className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-red-700 hover:border-red-600 hover:text-red-600 dark:border-gray-800 dark:hover:border-red-600"
				>
					Delete
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
						className="lucide lucide-trash-2"
					>
						<path d="M3 6h18" />
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
						<line x1="10" x2="10" y1="11" y2="17" />
						<line x1="14" x2="14" y1="11" y2="17" />
					</svg>
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
											className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-red-700 hover:border-red-600 hover:text-red-600 dark:border-gray-800 dark:hover:border-red-600"
											onClick={handleDelete}
										>
											Confirm
										</button>

										<button
											type="button"
											className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 hover:border-fuchsia-700 dark:border-gray-800 dark:hover:border-fuchsia-700"
											onClick={closeModal}
										>
											Cancel
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
