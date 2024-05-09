'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Link as LinkIcon, Check, BookOpen } from 'lucide-react'
import { Button } from './ui/button'

interface TListItem {
	id: number
	year: number
	title: string
	slug: string
}

export default function ListItem({ id, year, title, slug }: TListItem) {
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
		const urlLink = `${origin}/post/${slug}`
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
		<div
			key={id}
			className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4 sm:flex-row"
		>
			<div className="grid">
				<Link
					href={`/post/${slug}`}
					className="link text-xl hover:text-primary"
				>
					{title}
				</Link>
				<span>{year}</span>
			</div>

			<div className="ml-auto flex gap-2 md:items-center">
				<Button variant={'ghost'} onClick={handleCopyClick} className="gap-2">
					{isCopied ? (
						<span className="flex items-center gap-2 text-green-600">
							<Check />
							Copied!
						</span>
					) : (
						<>
							<LinkIcon />
							Get Link
						</>
					)}
				</Button>
				<Button variant={'ghost'} asChild>
					<Link href={`/post/${slug}`} className="gap-2">
						<BookOpen />
						Read
					</Link>
				</Button>
			</div>
		</div>
	)
}
