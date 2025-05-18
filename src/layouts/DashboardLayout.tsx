import { Outlet } from "react-router"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <nav>
        <ul className="flex items-center justify-center gap-10 bg-green-200 py-4 text-2xl font-semibold text-gray-800">
          {children}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
