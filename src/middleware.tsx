import type { Database } from '@/lib/database.types'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
	const res = NextResponse.next()

	// Create a Supabase client configured to use cookies
	const supabase = createMiddlewareClient<Database>({ req, res })

	// Refresh session if expired - required for Server Components
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
	await supabase.auth.getSession()

	return res
}
