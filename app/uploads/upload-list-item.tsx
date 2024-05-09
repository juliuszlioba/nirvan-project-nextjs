import { UploadsListItemCopyBtn } from './upload-list-item-copy-button'
import { UploadsListItemDeleteBtn } from './upload-list-item-delete-button'

interface DataProps {
	id: number
	image_name: string
	image_path: string
	createdat: string
}

const UploadsListItem = ({ data }: { data: DataProps }) => {
	return (
		<div className="flex w-full items-center gap-4 overflow-auto py-4">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={data.image_path}
				alt={data.image_name}
				className="w-28 rounded-md"
			/>
			<div className="flex w-full flex-col gap-2">
				<div>
					<h2 className="text-accent-1">Public Url:</h2>
					<p>{data.image_path}</p>
				</div>
				<div className="flex w-full justify-between gap-2">
					<UploadsListItemCopyBtn
						image_name={data.image_name}
						image_path={data.image_path}
					/>
					<UploadsListItemDeleteBtn id={data.id} image_name={data.image_name} />
				</div>
			</div>
		</div>
	)
}

export { UploadsListItem }
