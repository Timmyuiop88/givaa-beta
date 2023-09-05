import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { cache } from 'react';

export const createServerClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient({
        cookies: () => cookieStore
    })
})



import Signup from '../components/auth/signup';
  export default async function SignupPage() {
    const supabase = createServerClient()
    const { data } = await supabase.auth.getSession();
  
    if (data?.session) {
      redirect('/user');
    }
return(
    <Signup/>
)

    
  }
  