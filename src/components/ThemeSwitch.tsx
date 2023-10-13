'use client'

//import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false)
	const { setTheme } = useTheme()

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div className="flex flex-col items-center gap-4">
				<div className="flex gap-2">
					<div className="button theme-light text-gray">
						<Sun strokeWidth={1.5} className="h-6 w-6" />
					</div>
					<div className="button theme-dark text-gray">
						<Moon strokeWidth={1.5} className="h-6 w-6" />
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex gap-2">
				<Tooltip.Provider delayDuration={500}>
					<Tooltip.Root>
						<Tooltip.Trigger asChild>
							<button
								className="button theme-light text-gray"
								onClick={() => setTheme('light')}
							>
								<Sun strokeWidth={1.5} className="h-6 w-6" />
							</button>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content>
								<div className="rounded-md bg-content px-2 py-1 text-background">
									Light theme
								</div>
								<Tooltip.Arrow className="TooltipArrow " />
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>

				<Tooltip.Provider delayDuration={500}>
					<Tooltip.Root>
						<Tooltip.Trigger asChild>
							<button
								className="button theme-dark text-gray"
								onClick={() => setTheme('dark')}
							>
								<Moon strokeWidth={1.5} className="h-6 w-6" />
							</button>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content>
								<div className="rounded-md bg-content px-2 py-1 text-background">
									Dark theme
								</div>
								<Tooltip.Arrow className="TooltipArrow " />
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>

				{/* <Tooltip.Provider delayDuration={300}>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<button className="button" onClick={() => setTheme('system')}>
								<Laptop strokeWidth={1.5} className="h-6 w-6" />
							</button>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content>
								<div className="bg-primary rounded-md px-2 py-1">
									System default
								</div>
								<Tooltip.Arrow className="TooltipArrow " />
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider> */}
			</div>
		</div>
	)
}
