export default function LoaderSpinner() {
	return (
		<div className="text-gray mx-auto p-2">
			<svg
				className="ringIco"
				viewBox="25 25 50 50"
				strokeWidth="3"
				width="50"
				height="50"
				stroke="currentColor"
			>
				<circle cx="50" cy="50" r="20" />
			</svg>
		</div>
	)
}
