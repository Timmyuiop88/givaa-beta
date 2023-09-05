import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { cache } from 'react';

export const creater= cache(() => {
    const cookieStore = cookies()
    return createRouteHandlerClient({
        cookies: () => cookieStore
    })
})

export async function GET(req) {

  const supabase = creater()
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/user', req.url))
}