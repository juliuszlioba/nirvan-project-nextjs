import supabaseServerClient from '@/lib/supabase'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	const supabase = await supabaseServerClient()
	const { data, count } = await supabase
		.from('posts')
		.select(`id, year, author, title, slug`, { count: 'exact' })

	return NextResponse.json({ 'posts-count': count })
}
