'use client'

import { Button } from '@/components/ui/button'
import { UploadCloud } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" aria-disabled={pending} className="gap-1">
			{pending ? 'Uploading...' : 'Upload'}
			<UploadCloud strokeWidth={1.5} />
		</Button>
	)
}
