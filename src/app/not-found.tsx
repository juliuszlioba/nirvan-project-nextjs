import Link from 'next/link'

export default function NotFound() {
	return (
		<main
			className={`mx-auto flex min-h-screen max-w-5xl flex-col gap-4 p-4 py-8 md:p-8 xl:py-12 2xl:py-24`}
		>
			<h1 className="text-3xl">Not Found</h1>
			<p>Could not find requested page or resource.</p>
			<div>
				<Link
					href="/"
					className="border-gray hover:border-accent-1 inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2"
				>
					Return Home
				</Link>
			</div>
		</main>
	)
}
