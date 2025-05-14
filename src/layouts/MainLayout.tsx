import { Outlet } from "react-router"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function MainLayout() {
  return (
    <div className="bg-backgroundColor grid h-screen md:grid-cols-15 md:grid-rows-8">
      <Header className="flex items-center gap-8 text-4xl font-bold md:col-start-4 md:-col-end-1 md:px-8 md:py-5" />
      <Sidebar className="bg-sidebarColor text-white md:col-start-1 md:col-end-4 md:row-start-1 md:-row-end-1 md:px-7 md:py-12" />
      <div className="h-full md:col-start-4 md:-col-end-1 md:row-start-2 md:-row-end-1">
        <Outlet />
      </div>
    </div>
  )
}
