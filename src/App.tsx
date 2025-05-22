import { BrowserRouter, Routes, Route } from "react-router"
import MainLayout from "./layouts/MainLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import CreateVault from "./pages/Saving/CreateVault"
import VaultSummary from "./pages/Saving/VaultSummary"
import DeleteVault from "./pages/Saving/DeleteVault"
import AddMoney from "./pages/Saving/AddMoney"
import InternalLink from "@/components/link/InternalLink"
import InformationGather from "./pages/Interest/InformationGather"
import InterestBreakDown from "./pages/Interest/InterestBreakDown"
import RetirementSave from "./pages/RetirementSaving/RetirementSave"
import AddStock from "./pages/stock/AddStock"
import Portfolio from "./pages/stock/Portfolio"
import SymbolDetail from "./pages/stock/SymbolDetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<h1>hello</h1>} />
          <Route
            path="savings"
            element={
              <DashboardLayout>
                <InternalLink to=".">Dashboard</InternalLink>
                <InternalLink to="create">Create Vault</InternalLink>
                <InternalLink to="delete">Delete Vault</InternalLink>
                <InternalLink to="add">Add Money</InternalLink>
              </DashboardLayout>
            }
          >
            <Route index element={<VaultSummary />} />
            <Route path="create" element={<CreateVault />} />
            <Route path="delete" element={<DeleteVault />} />
            <Route path="add" element={<AddMoney />} />
          </Route>
          <Route
            path="interest"
            element={
              <DashboardLayout>
                <InternalLink to=".">Setup</InternalLink>
                <InternalLink to="breakdown">Break-Down</InternalLink>
              </DashboardLayout>
            }
          >
            <Route index element={<InformationGather />} />
            <Route path="breakdown" element={<InterestBreakDown />} />
          </Route>
          <Route path="budget" element={<h1>Budget Planner</h1>} />
          <Route path="retire" element={<RetirementSave />} />
          <Route
            path="stock"
            element={
              <DashboardLayout>
                <InternalLink to=".">Add your stock</InternalLink>
                <InternalLink to="portfolio">Your Portfolio</InternalLink>
              </DashboardLayout>
            }
          >
            <Route index element={<AddStock />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:symbol" element={<SymbolDetail />} />
          </Route>
          <Route path="investment" element={<h1>Invest Risk Simulator</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
