import {Box} from '../../utils/chakra'

import { getServerSession } from 'next-auth';
import Link from "next/link";
import { redirect } from "next/navigation";
import PageCampain from './components/pagecontent';
export default async function Campaigns(){
  const session = await getServerSession();
  if(!session) {
    redirect('/login');
  }
  
    return(
      <PageCampain/>
)
  };