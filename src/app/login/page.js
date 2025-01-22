


import { getServerSession } from 'next-auth';

import Login from './components/login';
import { redirect } from 'next/navigation';

  export default async function LoginPage() {

    const session = await getServerSession();
  if(session) {
    redirect('/user');
  }
  return(
    <Login/>

  )
    
  }
  