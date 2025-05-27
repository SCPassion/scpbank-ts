import { useEffect, useState } from "react"
import { ChartVisualization } from "./ChartVisualization"
import { useBudgetsStore, useUserStore } from "@/store/store"
import { fetchTransactions } from "@/functions/budgetOperation"

export default function BudgetPortfolio() {
  const chartDataEample = [
    { browser: "chrome", visitors: 275, fill: "green" },
    { browser: "safari", visitors: 200, fill: "blue" },
    { browser: "firefox", visitors: 287, fill: "red" },
    { browser: "edge", visitors: 173, fill: "orange" },
    { browser: "other", visitors: 190, fill: "purple" },
  ]

  const user = useUserStore((state) => state.user)
  const { budgets, setBudgets } = useBudgetsStore()
  const [error, setError] = useState<string>("")

  // Fallback function to fetch transactions if budgets are not available
  useEffect(() => {
    if (!user) return
    !budgets && fetchTransactions(user, setError, setBudgets)
  }, [user])

  const incomeCategories = budgets?.filter((budget) => budget.type === "income")
  const expenseCategories = budgets?.filter(
    (budget) => budget.type === "expense",
  )
  console.log("Income Categories:", incomeCategories)
  console.log("Expense Categories:", expenseCategories)
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-8">
      <ChartVisualization chartData={chartDataEample} />
    </div>
  )
}
