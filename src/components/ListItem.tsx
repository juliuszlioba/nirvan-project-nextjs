'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Link as LinkIcon, Check, BookOpen } from 'lucide-react'

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
				<Link href={`/post/${item.slug}`} className="link text-2xl">
					{item.title}
				</Link>
				<span>
					by {item.author}, published {item.year}
				</span>
			</div>

			<div className="ml-auto flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
				<button
					onClick={handleCopyClick}
					className="link flex gap-1 whitespace-nowrap"
				>
					{isCopied ? (
						<>
							<Check />
							Copied!
						</>
					) : (
						<>
							<LinkIcon />
							Get Link
						</>
					)}
				</button>
				<Link
					href={`/post/${item.slug}`}
					className="link flex items-center justify-end gap-1"
				>
					<BookOpen />
					Read
				</Link>
			</div>
		</div>
	)
}

export default ListItem
