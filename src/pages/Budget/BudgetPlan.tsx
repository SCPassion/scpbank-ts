import { useEffect, useId, useState } from "react"
import InputType from "./InputType"
import ExpenseCategory from "./ExpenseCategory"
import IncomeCategory from "./IncomeCategory"
import { supabase } from "@/supabase-client"
import { useBudgetsStore, useUserStore } from "@/store/store"
import { createCategoryRecord } from "@/functions/budgetOperation"
import type { PostgrestError, User } from "@supabase/supabase-js"
import type { Budget } from "@/lib/types"

type FetchTransactionsResponse = {
  data: Budget[] | null
  error: PostgrestError | null
}
export default function BudgetPlan() {
  const user = useUserStore((state) => state.user)
  const { budgets, setBudgets, addBudget, removeBudget } = useBudgetsStore()

  const id = useId()
  // default state for expense/income toggle
  const [isExpense, setIsExpense] = useState(true)
  const [error, setError] = useState<string>("")

  async function fetchTransactions(user: User) {
    // Fetch user data from Supabase
    const { data, error }: FetchTransactionsResponse = await supabase
      .from("transactions")
      .select("id, type, amount, category")
      .eq("user_id", user.id)

    if (error) {
      console.error("Error fetching user data:", error.message)
      setError("Failed to fetch user data. Please try again.")
      return
    }

    if (data) {
      setBudgets(data)
    }
  }
  useEffect(() => {
    user && fetchTransactions(user)
  }, [user])

  // Subscribe to changes in the transactions table in supabase
  useEffect(() => {
    const subscription = supabase
      .channel("transactions-change")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            addBudget(payload.new as Budget)
            console.log("Transaction added:", payload.new)
          } else if (payload.eventType === "DELETE") {
            removeBudget(payload.old.id)
            console.log("Transaction deleted:", payload.old)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user])

  const incomeCategories = budgets?.filter((budget) => budget.type === "income")
  const expenseCategories = budgets?.filter(
    (budget) => budget.type === "expense",
  )

  function handleFormAction(formData: FormData) {
    const type = String(formData.get("type"))
    const amount = Number(formData.get("amount"))
    const category = String(formData.get(`${type}-category`))
    console.log({ type, amount, category })

    user && createCategoryRecord({ user, type, amount, category, setError })

    setIsExpense(true) // Reset to default state after submission
  }

  return (
    <section className="mx-32 my-6 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-bol text-4xl">
        SmartBudget: Track Your Income & Expenses with Ease
      </h1>
      <p className="text-center text-lg">
        Log your income and expenses, visualize where your money goes with
        dynamic charts, and get real-time summaries. No clutter. No complexity.
        Just your money, clearly organized.
      </p>

      {error && <p className="text-red-500">Error: {error}</p>}

      <InputType setIsExpense={setIsExpense} />
      <div className="flex flex-wrap justify-center gap-4">
        <form
          className="flex flex-col gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleFormAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            {isExpense ? "Add your spending here!" : "Add your income here!"}
          </h3>

          {isExpense ? <ExpenseCategory id={id} /> : <IncomeCategory id={id} />}

          <div className="flex items-center gap-8">
            <label
              htmlFor={`${id}-amount`}
              className="text-xl font-bold text-lime-700"
            >
              Amount
            </label>
            <input
              type="number"
              id={`${id}-amount`}
              name="amount"
              className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
              placeholder="0"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
          >
            Submit!
          </button>
        </form>

        <form
          className="flex flex-col gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleFormAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            {isExpense ? "Edit your spending here!" : "Edit your income here!"}
          </h3>

          {isExpense ? <ExpenseCategory id={id} /> : <IncomeCategory id={id} />}

          <div className="flex items-center gap-8">
            <label
              htmlFor={`${id}-amount`}
              className="text-xl font-bold text-lime-700"
            >
              Amount
            </label>
            <input
              type="number"
              id={`${id}-amount`}
              name="amount"
              className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
              placeholder="0"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
          >
            Update now!
          </button>
        </form>
      </div>
    </section>
  )
}
