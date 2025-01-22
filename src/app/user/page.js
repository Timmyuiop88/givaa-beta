import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import DashboardContent from "./components/DashboardContent";

export default async function UserDashboard() {
  const session = await getServerSession();
  
  if(!session) {
    redirect('/login');
  }
  
  return <DashboardContent />;
}
