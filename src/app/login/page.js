

  import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
  import { cookies } from 'next/headers';
  import { redirect } from 'next/navigation';
import Login from '../components/auth/login';
  
  export default async function LoginPage() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();
  
    if (data?.session) {
      redirect('/user');
    }
  return(
    <Login/>

  )
    
  }
  