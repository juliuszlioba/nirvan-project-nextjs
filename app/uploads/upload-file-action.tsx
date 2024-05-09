'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const schema = z.object({
	file: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			'Only .jpg, .jpeg, and .png formats are supported.'
		),
})

async function uploadFile(prevState: any, formData: FormData) {
	const validatedFields = schema.safeParse({
		file: formData.get('file'),
	})

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return {
			message: 'Error. File is too big or wrong format.',
		}
	}

	const supabase = createClient()

	const file = formData.get('file') as File
	const bucket = 'images'

	if (!file || file === undefined) {
		return {
			message: 'Error.',
		}
	}

	// Call Storage API to upload file
	const { data: upload, error: uploadError } = await supabase.storage
		.from(bucket)
		.upload(file.name, file)

	// Handle error if upload failed
	if (!upload) {
		return {
			message: 'Upload Error.',
		}
	}

	// insert image to images table
	const { error } = await supabase.from('images').insert({
		image_name: file.name,
		image_path: supabase.storage.from('images').getPublicUrl(file.name).data
			.publicUrl,
	})

	// Handle error if upload failed
	if (error) {
		return {
			message: 'Database Error.',
		}
	}

	// revalidate cache
	revalidatePath('/uploads', 'page')

	return {
		message: 'Sucess',
	}
}

export { uploadFile as default }
