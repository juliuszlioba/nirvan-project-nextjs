'use client'

import { useState } from 'react'
import {
	EmailShareButton,
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
const strokeWidth = 1.25

export default function ShareButtons() {
	const [isCopied, setIsCopied] = useState(false)

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: ''

	const pathname = usePathname()

	async function copyTextToClipboard(text: any) {
		if ('clipboard' in navigator) {
			return await navigator.clipboard.writeText(text)
		} else {
			return document.execCommand('copy', true, text)
		}
	}

	// onClick handler function for the copy button
	const handleCopyClick = () => {
		const urlLink = `${origin}${pathname}`
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
		<div className="mb-4 flex flex-col gap-8 rounded-lg bg-muted/40 py-12">
			{isCopied && (
				<div className="flex justify-center text-green-600">
					Page link coppied to clipboard!
				</div>
			)}

			<div className="flex justify-center gap-2">
				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<Button
									onClick={handleCopyClick}
									variant={'ghost'}
									size={'icon'}
								>
									<div>
										{isCopied ? (
											<div className="text-green-600">
												{/* prettier-ignore */}
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="w-8 h-8"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="m8.667 12.833 2.5 2.5L15.333 9.5M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12Z"/> </svg>
											</div>
										) : (
											<>
												{/* prettier-ignore */}
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" className="w-8 h-8"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 1 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 1 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/> </svg>
											</>
										)}
									</div>
								</Button>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Copy Link to this Post</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<FacebookShareButton url={`${origin}${pathname}`}>
									<Button variant={'ghost'} size={'icon'} asChild>
										<div>
											{/* prettier-ignore */}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" className="w-8 h-8"> <g clipPath="url(#a)"> <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth={strokeWidth} d="M14 9.3v2.9h2.6c.2 0 .3.2.3.4l-.4 1.9c0 .1-.2.2-.3.2H14V22h-3v-7.2H9.3c-.2 0-.3-.1-.3-.3v-1.9c0-.2.1-.3.3-.3H11V9c0-1.7 1.3-3 3-3h2.7c.2 0 .3.1.3.3v2.4c0 .2-.1.3-.3.3h-2.4c-.2 0-.3.1-.3.3Z"/> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M15 22H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h6c5 0 7 2 7 7v6c0 5-2 7-7 7Z"/> </g> <defs> <clipPath id="a"> <path fill="currentColor" d="M0 0h24v24H0z"/> </clipPath> </defs> </svg>
										</div>
									</Button>
								</FacebookShareButton>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Share on Facebook</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<TelegramShareButton url={`${origin}${pathname}`}>
									<Button variant={'ghost'} size={'icon'} asChild>
										<div>
											{/* prettier-ignore */}
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="w-8 h-8"> <g stroke="currentColor" strokeWidth={strokeWidth} clipPath="url(#a)"> <path strokeLinecap="round" strokeLinejoin="round" d="M22 12a10 10 0 1 1-20.001 0A10 10 0 0 1 22 12Z"/> <path d="M17.745 7.955c-.18 1.932-.96 6.622-1.357 8.787-.167.915-.498 1.223-.818 1.252-.695.066-1.223-.468-1.896-.92-1.053-.704-1.649-1.143-2.671-1.831-1.182-.795-.416-1.232.257-1.947.177-.187 3.24-3.031 3.299-3.29.007-.031.014-.152-.056-.215-.07-.064-.173-.042-.248-.025-.105.025-1.789 1.16-5.05 3.408-.477.334-.91.498-1.297.49-.428-.01-1.25-.248-1.861-.45-.75-.25-1.346-.38-1.294-.803.027-.22.324-.445.89-.675 3.49-1.553 5.818-2.576 6.982-3.07C15.95 7.252 16.64 7.007 17.09 7c.1-.002.321.023.464.142a.519.519 0 0 1 .17.331c.025.16.032.32.02.482Z"/> </g> <defs> <clipPath id="a"> <path fill="#fff" d="M0 0h24v24H0z"/> </clipPath> </defs> </svg>
										</div>
									</Button>
								</TelegramShareButton>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Share via Telegram</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<TwitterShareButton url={`${origin}${pathname}`}>
									<Button variant={'ghost'} size={'icon'} asChild>
										<div>
											{/* prettier-ignore */}
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="w-8 h-8" strokeWidth={strokeWidth}> <path fill="currentColor" fillRule="evenodd" d="M11.556 8.662C11.556 6.087 13.7 4 16.345 4c1.552 0 2.792.715 3.623 1.752a8.17 8.17 0 0 0 2.49-.937c-.299.91-.932 1.676-1.758 2.16l.002.005A8.23 8.23 0 0 0 23 6.365l-.002.003a8.054 8.054 0 0 1-1.91 1.957c.04.263.06.527.06.79C21.148 14.61 16.846 21 8.933 21c-2.423 0-4.68-.691-6.58-1.877a.733.733 0 0 1-.166-1.116.696.696 0 0 1 .671-.32c1.402.162 2.804-.005 4.04-.53a4.647 4.647 0 0 1-2.59-2.797.657.657 0 0 1 .158-.667 4.523 4.523 0 0 1-1.601-3.444v-.05c0-.238.13-.458.34-.578a.7.7 0 0 1 .22-.081 4.474 4.474 0 0 1-.527-2.11c0-.698.004-1.577.509-2.368a.69.69 0 0 1 .495-.312.78.78 0 0 1 .823.24 10.741 10.741 0 0 0 6.831 3.736v-.064ZM8.933 19.51a10.89 10.89 0 0 1-3.444-.555c1.313-.222 2.574-.725 3.66-1.553a.66.66 0 0 0 .228-.742.688.688 0 0 0-.641-.457A3.36 3.36 0 0 1 6.11 14.88c.291-.023.576-.072.852-.144a.673.673 0 0 0 .509-.67.676.676 0 0 0-.553-.635A3.31 3.31 0 0 1 4.4 11.233c.307.073.627.116.954.126.308.01.585-.18.679-.465a.661.661 0 0 0-.273-.763A3.223 3.223 0 0 1 4.276 7.43c0-.25.004-.473.02-.675a12.33 12.33 0 0 0 8.09 3.542c.24.012.472-.087.626-.265a.73.73 0 0 0 .16-.645 3.174 3.174 0 0 1-.085-.725c0-1.752 1.46-3.172 3.258-3.172 1.89 0 3.271 1.705 3.271 3.626 0 4.853-3.792 10.394-10.683 10.394Z" clipRule="evenodd"/> </svg>
										</div>
									</Button>
								</TwitterShareButton>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Share on X (former Twitter)</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<WhatsappShareButton url={`${origin}${pathname}`}>
									<Button variant={'ghost'} size={'icon'} asChild>
										<div>
											{/* prettier-ignore */}
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" className="w-8 h-8"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M12 20.174c5.522 0 10-4.069 10-9.087S17.522 2 12 2 2 6.069 2 11.087c0 2.317.954 4.431 2.526 6.036.48.492.822 1.145.65 1.807a4.923 4.923 0 0 1-1.025 1.966c.39.07.786.105 1.182.104a6.675 6.675 0 0 0 3.828-1.197c.9.242 1.853.37 2.839.37Z"/> <path stroke="currentColor" strokeWidth={strokeWidth} d="M16.948 13.362c-.269-.134-1.6-.774-1.85-.86-.249-.09-.43-.133-.61.134-.18.268-.698.86-.859 1.041-.156.177-.317.2-.585.067-1.591-.778-2.635-1.39-3.684-3.152-.279-.468.278-.435.795-1.447.088-.177.044-.33-.024-.464-.069-.134-.61-1.438-.835-1.968-.22-.516-.444-.444-.61-.453-.156-.01-.337-.01-.517-.01s-.473.067-.722.33c-.25.267-.947.907-.947 2.211 0 1.304.971 2.565 1.103 2.742.136.176 1.908 2.851 4.626 4.002 1.718.726 2.391.788 3.25.664.522-.076 1.6-.64 1.825-1.26.224-.622.224-1.152.156-1.262-.063-.12-.244-.186-.512-.315Z"/> </svg>
										</div>
									</Button>
								</WhatsappShareButton>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Share via WhatsApp</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<div>
								<EmailShareButton url={`${origin}${pathname}`}>
									<Button variant={'ghost'} size={'icon'} asChild>
										<div>
											{/* prettier-ignore */}
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" className="w-8 h-8"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/> </svg>
										</div>
									</Button>
								</EmailShareButton>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Share via Email</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	)
}
