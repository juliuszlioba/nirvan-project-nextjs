import { createClient } from '@/utils/supabase/server'
import { EmailOtpType } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const requestUrl = new URL(request.url)
	const token_hash = requestUrl.searchParams.get('token_hash')
	const type = requestUrl.searchParams.get('type') as EmailOtpType
	const next = requestUrl.searchParams.get('next') ?? '/'
	const origin = requestUrl.origin

	if (token_hash) {
		const supabase = createClient()
		const { error } = await supabase.auth.verifyOtp({ token_hash, type })
		if (!error) {
			// URL to redirect to after sign up process completes
			return NextResponse.redirect(`${origin}/${next}`)
		}
	}

	// return the user to an error page with some instructions
	return NextResponse.redirect(`${origin}/auth/auth-error`)
}
