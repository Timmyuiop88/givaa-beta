import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { cache } from 'react';

export const createRouteHandler = cache(() => {
    const cookieStore = cookies()
    return createRouteHandlerClient({
        cookies: () => cookieStore
    })
})

export async function POST(req) {

  const supabase = createRouteHandler()

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
    redirect('/login')
  }

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}