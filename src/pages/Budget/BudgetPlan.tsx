import { useEffect, useId, useState } from "react"
import InputType from "./InputType"
import ExpenseCategory from "./ExpenseCategory"
import IncomeCategory from "./IncomeCategory"
import { supabase } from "@/supabase-client"
import { useBudgetsStore, useUserStore } from "@/store/store"
import {
  createCategoryRecord,
  editCategoryRecord,
  fetchTransactions,
  removeCategoryRecord,
} from "@/functions/budgetOperation"
import type { Budget } from "@/lib/types"
import type { User } from "@supabase/supabase-js"

export default function BudgetPlan() {
  const user = useUserStore((state) => state.user)
  const {
    budgets,
    setBudgets,
    addBudget,
    updateBudget,
    removeBudget,
    clearBudgets,
  } = useBudgetsStore()
  const id = useId()
  // default state for expense/income toggle
  const [isExpense, setIsExpense] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    user && fetchTransactions(user, setError, setBudgets)
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
          } else if (payload.eventType === "UPDATE") {
            const updatedBudget = payload.new as Budget
            updateBudget(updatedBudget.id, updatedBudget)
            console.log("Transaction updated:", updatedBudget)
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user])

  function handleAddAction(formData: FormData) {
    const type = isExpense ? "expense" : "income"
    const amount = Number(formData.get("amount"))
    const category = String(formData.get(`${type}-category`))
    console.log("Adding:", { type, amount, category })

    user && createCategoryRecord({ user, type, amount, category, setError })

    setIsExpense(true) // Reset to default state after submission
  }

  function handleEditAction(formData: FormData) {
    const type = isExpense ? "expense" : "income"
    const amount = Number(formData.get("amount"))
    const category = String(formData.get(`${type}-category`))
    console.log("Editing:", { type, amount, category })

    user && editCategoryRecord({ user, type, amount, category, setError })
    setIsExpense(true) // Reset to default state after submission
  }

  function handleRemoveAction(formData: FormData) {
    const type = isExpense ? "expense" : "income"
    const category = String(formData.get(`${type}-category`))
    console.log("Removing:", { type, category })

    if (budgets === null) return
    const selectedBudget = budgets.find(
      (budget) => budget.category === category && budget.type === type,
    ) as Budget

    user && removeCategoryRecord(user, selectedBudget.id, setError)
  }

  async function clearBudget(user: User) {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("user_id", user.id)
      if (error) {
        console.error("Error clearing budgets:", error.message)
        throw new Error(error.message)
      } else {
        console.log("All budgets cleared successfully")
        clearBudgets() // Clear the budgets state
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error clearing budgets:", error.message)
        setError(error.message)
      }
    }
  }
  function handleClearAction() {
    if (budgets === null) return
    console.log("Clearing all budgets")
    user && clearBudget(user)
  }

  const incomeCategories = budgets?.filter((budget) => budget.type === "income")
  const expenseCategories = budgets?.filter(
    (budget) => budget.type === "expense",
  )

  return (
    <section className="mx-32 my-6 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl">
        SmartBudget: Track Your Income & Expenses with Ease
      </h1>
      {/* <p className="text-center text-lg">
        Log your income and expenses, visualize where your money goes with
        dynamic charts, and get real-time summaries. No clutter. No complexity.
        Just your money, clearly organized.
      </p> */}

      {error && <p className="text-red-500">Error: {error}</p>}

      <InputType isExpense={isExpense} setIsExpense={setIsExpense} />
      <div className="flex flex-wrap justify-center gap-4">
        <form
          className="flex flex-col gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleAddAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            {isExpense ? "Add your spending here!" : "Add your income here!"}
          </h3>

          {isExpense ? (
            <ExpenseCategory>
              <option value="Housing">Housing</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Rent">Rent</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </ExpenseCategory>
          ) : (
            <IncomeCategory>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Other">Other</option>
            </IncomeCategory>
          )}

          <div className="flex items-center gap-8">
            <label
              htmlFor={`${id}-add-amount`}
              className="text-xl font-bold text-lime-700"
            >
              Amount
            </label>
            <input
              type="number"
              id={`${id}-add-amount`}
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
          action={handleEditAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            {isExpense ? "Edit your spending here!" : "Edit your income here!"}
          </h3>

          {isExpense ? (
            <ExpenseCategory>
              {expenseCategories?.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </ExpenseCategory>
          ) : (
            <IncomeCategory>
              {incomeCategories?.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </IncomeCategory>
          )}

          <div className="flex items-center gap-8">
            <label
              htmlFor={`${id}-edit-amount`}
              className="text-xl font-bold text-lime-700"
            >
              Amount
            </label>
            <input
              type="number"
              id={`${id}-edit-amount`}
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

        <form
          className="flex flex-col gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleRemoveAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            {isExpense
              ? "Remove your spending here!"
              : "Remove your income here!"}
          </h3>

          {isExpense ? (
            <ExpenseCategory>
              {expenseCategories?.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </ExpenseCategory>
          ) : (
            <IncomeCategory>
              {incomeCategories?.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </IncomeCategory>
          )}

          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
          >
            Remove now!
          </button>
        </form>

        <form
          className="flex flex-col justify-center gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleClearAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            Clear all budget record now!
          </h3>

          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
          >
            Clear now!
          </button>
        </form>
      </div>
    </section>
  )
}
