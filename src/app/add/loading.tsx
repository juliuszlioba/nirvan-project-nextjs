import Loader from '@/components/loader'

export default function Loading() {
	return (
		<main
			className={`mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-4 p-4 py-8 md:p-8 xl:p-12 2xl:p-24`}
		>
			<div className="flex justify-center">
				<Loader />
			</div>
		</main>
	)
}
