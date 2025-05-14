import { NavLink, Link } from "react-router"

export default function () {
  const normalClass =
    "rounded-lg text-white py-4 block px-8 text-xl font-medium duration-300 hover:bg-green-700"

  return (
    <nav>
      <ul className="space-y-10">
        <li>
          <NavLink
            to="savings"
            className={({ isActive }) =>
              isActive ? `bg-selectedTab ${normalClass}` : normalClass
            }
          >
            Savings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="interest"
            className={({ isActive }) =>
              isActive ? `bg-selectedTab ${normalClass}` : normalClass
            }
          >
            Interest Calculator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="budget"
            className={({ isActive }) =>
              isActive ? `bg-selectedTab ${normalClass}` : normalClass
            }
          >
            Budget Planner
          </NavLink>
        </li>
        <li>
          <NavLink
            to="retire"
            className={({ isActive }) =>
              isActive ? `bg-selectedTab ${normalClass}` : normalClass
            }
          >
            Retirement Planner
          </NavLink>
        </li>
        <li>
          <NavLink
            to="stock"
            className={({ isActive }) =>
              isActive ? `bg-selectedTab ${normalClass}` : normalClass
            }
          >
            Stock Market
          </NavLink>
        </li>
        <li>
          <NavLink
            to="investment"
            className={({ isActive }) =>
              isActive ? `bg-selectedTab ${normalClass}` : normalClass
            }
          >
            Investment Risk
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
