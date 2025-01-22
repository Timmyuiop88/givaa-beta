

import { getServerSession } from 'next-auth';
import Link from "next/link";
import { redirect } from "next/navigation";
import PageNewCampain from './components/pageContent';

export default async function Campaigns(){
  const session = await getServerSession();
  if(!session) {
    redirect('/login');
  }
  
    return(
      <PageNewCampain/>
)
  };