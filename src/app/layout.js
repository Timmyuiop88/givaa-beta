import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ThemeProvider from './providers'
import AuthProvider from './components/AuthProvider';

export const metadata = {
  title: 'Givaa Beta',
  description: 'Let’s Help And Make People Smile By Giving Of Yours',
}

export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({cookies: () => cookieStore
  
  });

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