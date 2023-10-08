'use client'

import Link from 'next/link'
import { useState } from 'react'

const ListItem = ({ item }: any) => {
	const [isCopied, setIsCopied] = useState(false)

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	async function copyTextToClipboard(text: any) {
		if ('clipboard' in navigator) {
			return await navigator.clipboard.writeText(text)
		} else {
			return document.execCommand('copy', true, text)
		}
	}

	// onClick handler function for the copy button
	const handleCopyClick = () => {
		const urlLink = `${origin}/post/${item.slug}`
		copyTextToClipboard(urlLink)
			.then(() => {
				// If successful, update the isCopied state value
				setIsCopied(true)
				setTimeout(() => {
					setIsCopied(false)
				}, 3000)
			})
			.catch((err) => {
				console.log(err)
			})
	}

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
					by {item.author}, published {item.year}
				</span>
			</div>

			<div className="ml-auto flex items-center gap-4">
				<button
					onClick={handleCopyClick}
					className="flex items-center gap-2 text-lg hover:text-fuchsia-700"
				>
					{isCopied ? (
						<>
							{/* prettier-ignore */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="w-6 h-6"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="m8.667 12.833 2.5 2.5L15.333 9.5M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12Z"/> </svg>
							Copied!
						</>
					) : (
						<>
							{/* prettier-ignore */}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" className="w-6 h-6"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 1 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 1 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/> </svg>
							Get Link
						</>
					)}
				</button>
				<Link
					href={`/post/${item.slug}`}
					className="flex items-center gap-2 text-lg hover:text-fuchsia-700"
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
		</div>
	)
}

export default ListItem
