

  import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

  import { redirect } from 'next/navigation';
import Login from '../components/auth/login';
import { cookies } from 'next/headers'
import { cache } from 'react';

export const createServerClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient({
        cookies: () => cookieStore
    })
})
  export default async function LoginPage() {

    const supabase = createServerClient()
    const { data } = await supabase.auth.getSession();
  
    if (data?.session) {
      redirect('/user');
    }
  return(
    <Login/>

  )
    
  }
  