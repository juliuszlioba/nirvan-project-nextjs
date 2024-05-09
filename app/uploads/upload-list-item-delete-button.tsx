'use client'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import uploadFileDelete from './upload-file-delete-action'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DataProps {
	id: number
	image_name: string
}

const UploadsListItemDeleteBtn = ({ id, image_name }: DataProps) => {
	const router = useRouter()

	const handleDelete = async () => {
		const res = await uploadFileDelete(id, image_name)
		router.refresh()
	}

	return (
		<>
			<div className="flex flex-wrap gap-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={'outline'} className="gap-1 text-red-700">
							Delete
							<Trash2 strokeWidth={1.5} />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
						</DialogHeader>

						<div>
							This action will permanently delete image. Delete process is{' '}
							<span className="font-semibold text-red-600">ireversable</span>.
						</div>

						<div className="flex justify-between gap-2">
							<Button variant={'destructive'} onClick={handleDelete}>
								Delete
							</Button>
							<DialogClose asChild>
								<Button variant={'outline'}>Cancel</Button>
							</DialogClose>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</>
	)
}

export { UploadsListItemDeleteBtn }
