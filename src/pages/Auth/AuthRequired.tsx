import { useUserStore } from "@/store/store"
import { Outlet } from "react-router"

export default function AuthRequired() {
  const user = useUserStore((state) => state.user)

  // Render children if user is authenticated
  return (
    <div>
      {user ? (
        <Outlet />
      ) : (
        <div className="mt-2 flex h-screen justify-center">
          <h1 className="text-4xl">Please log in to access this page.</h1>
        </div>
      )}
    </div>
  )
}
