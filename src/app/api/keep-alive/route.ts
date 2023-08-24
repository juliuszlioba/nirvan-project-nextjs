import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/database.types'

export async function GET(request: Request) {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data, count } = await supabase
		.from('posts')
		.select(`id, year, author, title, slug`, { count: 'exact' })

	return NextResponse.json({ 'posts-count': count })
}
