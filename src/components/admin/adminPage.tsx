import { useSession } from "next-auth/react";
import AdminDashboard from "./adminDashboard";

export default function AdminPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;

  if (role !== "admin") {
    return <div>Доступ запрещён</div>;
  }

  return <AdminDashboard />;
}
