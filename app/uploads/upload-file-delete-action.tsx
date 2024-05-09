'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

async function uploadFileDelete(id: number, image_name: string) {
	const supabase = createClient()

	const bucket = 'images'

	if (!id || !image_name) {
		return {
			message: 'Error.',
		}
	}

	// Call Storage API to delete file
	const { data: upload, error: uploadError } = await supabase.storage
		.from(bucket)
		.remove([image_name])

	// Handle error if upload failed
	if (!upload) {
		return {
			message: 'Delete Error.',
		}
	}

	// insert image to images table
	const { error } = await supabase.from('images').delete().eq('id', id)

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

export { uploadFileDelete as default }
