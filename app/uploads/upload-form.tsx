'use client'

import uploadFile from './upload-file-action'
import { SubmitButton } from './upload-button'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

const initialState = {
	message: '',
}

export function UploadFileForm() {
	const [showState, setShowState] = useState(false)
	const [state, formAction] = useFormState(uploadFile, initialState)

	useEffect(() => {
		setShowState(true)
		setTimeout(() => {
			setShowState(false)
		}, 3000)
	}, [state])

	return (
		<form action={formAction}>
			<div className="flex items-center gap-2">
				<Input name="file" type="file" />
				<SubmitButton />
			</div>
			{showState && <p>{state?.message}</p>}
		</form>
	)
}
