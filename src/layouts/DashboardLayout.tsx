import { Outlet, NavLink } from "react-router"
export default function DashboardLayout() {
  return (
    <div>
      <nav>
        <ul className="flex items-center justify-center gap-10 bg-green-200 py-4 text-2xl font-semibold text-gray-800">
          <li>
            <NavLink
              to="."
              className={({ isActive }) =>
                isActive ? "text-3xl underline" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="create"
              className={({ isActive }) =>
                isActive ? "text-3xl underline" : ""
              }
            >
              Create Vault
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
