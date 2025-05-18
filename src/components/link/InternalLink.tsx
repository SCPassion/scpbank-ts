import { NavLink } from "react-router"

type InternalLinkProps = {
  children: React.ReactNode
  to: string
}
export default function InternalLink({ children, to }: InternalLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "rounded-full bg-green-100 px-8 py-6 text-3xl underline"
            : "transition-all duration-300 hover:scale-105 hover:text-3xl"
        }
        end
      >
        {children}
      </NavLink>
    </li>
  )
}
