import { BrowserRouter, Routes, Route } from "react-router"
import MainLayout from "./layouts/MainLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import CreateVault from "./pages/CreateVault"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<h1>hello</h1>} />
          <Route path="savings" element={<DashboardLayout />}>
            <Route index element={<h1>Home</h1>} />
            <Route path="create" element={<CreateVault />} />
          </Route>
          <Route
            path="interest"
            element={<h1>Compound Interest Calculator</h1>}
          />
          <Route path="budget" element={<h1>Budget Planner</h1>} />
          <Route path="retire" element={<h1>Retirement Saving Planner</h1>} />
          <Route path="stock" element={<h1>Stock Market Watchlist</h1>} />
          <Route path="investment" element={<h1>Invest Risk Simulator</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
