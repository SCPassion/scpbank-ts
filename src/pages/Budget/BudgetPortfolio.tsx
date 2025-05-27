import { useEffect, useState } from "react"
import { ChartVisualization } from "./ChartVisualization"
import { useBudgetsStore, useUserStore } from "@/store/store"
import { fetchTransactions } from "@/functions/budgetOperation"

export default function BudgetPortfolio() {
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

  const incomeChartData = incomeCategories?.map((category, index) => ({
    category: category.category,
    amount: category.amount,
    fill: `hsl(${50 + index * 50}, 50%, 50%)`,
  }))

  const expenseChartData = expenseCategories?.map((category, index) => ({
    category: category.category,
    amount: category.amount,
    fill: `hsl(${50 + index * 50}, 50%, 50%)`,
  }))

  console.log("Income Categories:", incomeCategories)
  console.log("Expense Categories:", expenseCategories)
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      {expenseChartData && (
        <div className="h-64 w-full max-w-sm">
          <ChartVisualization chartData={expenseChartData} type="expense" />
        </div>
      )}
      {incomeChartData && (
        <div className="h-64 w-full max-w-sm">
          <ChartVisualization chartData={incomeChartData} type="income" />
        </div>
      )}
    </div>
  )
}
