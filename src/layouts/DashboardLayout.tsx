import { Outlet } from "react-router"
import InternalLink from "@/components/link/InternalLink"

export default function DashboardLayout() {
  return (
    <div>
      <nav>
        <ul className="flex items-center justify-center gap-10 bg-green-200 py-4 text-2xl font-semibold text-gray-800">
          <InternalLink to=".">Dashboard</InternalLink>
          <InternalLink to="create">Create Vault</InternalLink>
          <InternalLink to="delete">Delete Vault</InternalLink>
          <InternalLink to="add">Add Money</InternalLink>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
