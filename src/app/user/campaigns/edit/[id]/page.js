import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import EditCampaignContent from "./components/EditCampaignContent";

export default async function EditCampaign() {
  const session = await getServerSession();
  
  if(!session) {
    redirect('/login');
  }
  
  return <EditCampaignContent />;
} 