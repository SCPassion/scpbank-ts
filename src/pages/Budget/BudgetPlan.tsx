import { useId, useState } from "react"
import InputType from "./InputType"
import ExpenseCategory from "./ExpenseCategory"
import IncomeCategory from "./IncomeCategory"
import { supabase } from "@/supabase-client"
import { useUserStore } from "@/store/store"
import { createCategoryRecord } from "@/functions/budgetOperation"

export default function BudgetPlan() {
  const user = useUserStore((state) => state.user)
  const id = useId()
  // default state for expense/income toggle
  const [isExpense, setIsExpense] = useState(true)
  const [error, setError] = useState<string>("")

  function handleFormAction(formData: FormData) {
    const type = String(formData.get("type"))
    const amount = Number(formData.get("amount"))
    const category = String(formData.get(`${type}-category`))
    console.log({ type, amount, category })

    user && createCategoryRecord({ user, type, amount, category, setError })
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

      <div>
        <form
          className="flex flex-col gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleFormAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            Add your spending here!
          </h3>

          <InputType setIsExpense={setIsExpense} />

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

          {isExpense ? <ExpenseCategory id={id} /> : <IncomeCategory id={id} />}

          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
