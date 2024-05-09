import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { UploadFileForm } from './upload-form'
import { UploadsListItem } from './upload-list-item'
import { createClient } from '@/utils/supabase/server'

//import uploadFile from './upload-file-action'
//import { SubmitButton } from './upload-button'

export const metadata: Metadata = {
	title: 'Uploads',
}

export default async function Page() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/')
	}

	const { data, error } = await supabase
		.from('images')
		.select(`id, image_name, image_path, createdat`)
		.order('createdat', { ascending: false })

	return (
		<main className="flex flex-col gap-8">
			<div className="flex flex-col gap-4 rounded-md bg-muted/50 p-6">
				<h1 className="text-2xl">Upload New Image</h1>
				<UploadFileForm />
			</div>

			<div className="flex flex-col">
				<h1 className="text-2xl">Uploads:</h1>
				<div className="divide-gray-light flex w-full flex-col divide-y-2 divide-dashed">
					{data?.map((image) => (
						<UploadsListItem key={image.id} data={image} />
					))}
				</div>
			</div>
		</main>
	)
}
