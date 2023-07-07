import { getCookie, setCookie } from 'cookies-next'

export const getCurrentScheme = async () => {
	if (typeof window === 'undefined') {
		return import('next/headers').then(({ cookies }) => {
			return cookies().has('scheme') ? cookies().get('scheme')?.value : 'dark'
		})
	}

	return getCookie('scheme', { path: '/' })
}

export const toggleScheme = async () => {
	const scheme = await getCurrentScheme()
	const newScheme = scheme === 'light' ? 'dark' : 'light'

	setCookie('scheme', newScheme, {
		path: '/',
	})

	return newScheme
}
