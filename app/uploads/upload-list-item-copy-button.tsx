'use client'

import { Button } from '@/components/ui/button'
import { ClipboardCheck, Clipboard } from 'lucide-react'
import { useState } from 'react'

interface DataProps {
	image_name: string
	image_path: string
}

const UploadsListItemCopyBtn = ({ image_name, image_path }: DataProps) => {
	const [isCopied, setIsCopied] = useState(false)
	const [isCopiedUrl, setisCopiedUrl] = useState(false)

	async function copyTextToClipboard(text: any) {
		if ('clipboard' in navigator) {
			return await navigator.clipboard.writeText(text)
		} else {
			return document.execCommand('copy', true, text)
		}
	}

	// onClick handler function for the copy button
	const handleCopyClick = () => {
		const urlLink = `![${image_name}](${image_path})`
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

	// onClick handler function for the copy button
	const handleCopyClick2 = () => {
		const urlLink = `${image_path}`
		copyTextToClipboard(urlLink)
			.then(() => {
				// If successful, update the isCopied state value
				setisCopiedUrl(true)
				setTimeout(() => {
					setisCopiedUrl(false)
				}, 3000)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className="flex flex-wrap gap-2">
			<Button variant={'outline'} onClick={handleCopyClick} title="Url Link">
				{isCopied ? (
					<div className="flex items-center gap-2 text-green-500">
						<ClipboardCheck strokeWidth={1.5} />
						Copied!
					</div>
				) : (
					<div className="flex items-center gap-2">
						<Clipboard strokeWidth={1.5} />
						Copy with .md formating
					</div>
				)}
			</Button>

			<Button variant={'outline'} onClick={handleCopyClick2} title="Url Link">
				{isCopiedUrl ? (
					<div className="flex items-center gap-2 text-green-500">
						<ClipboardCheck strokeWidth={1.5} />
						Copied!
					</div>
				) : (
					<div className="flex items-center gap-2">
						<Clipboard strokeWidth={1.5} />
						Copy only URL
					</div>
				)}
			</Button>
		</div>
	)
}

export { UploadsListItemCopyBtn }
