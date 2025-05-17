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
                isActive
                  ? "rounded-full bg-green-100 px-8 py-6 text-3xl underline"
                  : "transition-all duration-300 hover:scale-105 hover:text-3xl"
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="create"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-green-100 px-8 py-6 text-3xl underline"
                  : "transition-all duration-300 hover:scale-105 hover:text-3xl"
              }
            >
              Create Vault
            </NavLink>
          </li>
          <li>
            <NavLink
              to="delete"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-green-100 px-8 py-6 text-3xl underline"
                  : "transition-all duration-300 hover:scale-105 hover:text-3xl"
              }
            >
              Delete Vault
            </NavLink>
          </li>
          <li>
            <NavLink
              to="add"
              className={({ isActive }) =>
                isActive
                  ? "rounded-full bg-green-100 px-8 py-6 text-3xl underline"
                  : "transition-all duration-300 hover:scale-105 hover:text-3xl"
              }
            >
              Add Money
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
