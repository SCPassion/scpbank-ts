import { useEffect, useState } from "react"
import { Link } from "react-router"
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

  return (
    <div className="flex flex-col gap-3">
      <h1 className="mt-4 text-center text-4xl">Budget Portfolio</h1>

      {budgets && budgets.length > 0 ? (
        <div>
          <p className="text-center">"View your budget portfolio here."</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            {expenseChartData && (
              <div className="h-64 w-full max-w-sm">
                {expenseChartData.length > 0 ? (
                  <ChartVisualization
                    chartData={expenseChartData}
                    type="expense"
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    No expense categories available.
                  </p>
                )}
              </div>
            )}
            {incomeChartData && (
              <div className="h-64 w-full max-w-sm">
                {incomeChartData.length > 0 ? (
                  <ChartVisualization
                    chartData={incomeChartData}
                    type="income"
                  />
                ) : (
                  <p className="flex h-full flex-col justify-center text-center text-gray-500">
                    No income categories available.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <p className="text-lg font-semibold text-red-600">
            {error || "No budget data available. Please add some budgets."}
          </p>
          <p className="text-sm text-gray-500">
            You can add budgets in the{" "}
            <Link
              to=".."
              relative="path"
              className="text-blue-500 hover:underline"
            >
              Budget section
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
