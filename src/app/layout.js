import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import ThemeProvider from './providers'
import AuthProvider from './components/AuthProvider';

import { cookies } from 'next/headers'
import { cache } from 'react';

export const createServerClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient({
        cookies: () => cookieStore
    })
})


export default async function RootLayout({ children }) {

  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body >
      <AuthProvider accessToken={accessToken}>
        <ThemeProvider>
        {children}
        </ThemeProvider>
        </AuthProvider>
        
        </body>
    </html>
  )
}