import { Link } from "react-router"
import Navigations from "./Navigations"

export default function Sidebar({ ...rest }) {
  return (
    <div {...rest}>
      <Link to="/">
        <p className="mb-20 text-center text-4xl font-light">
          <span className="font-black">SCP</span>Bank
        </p>
      </Link>

      <Navigations />
    </div>
  )
}
