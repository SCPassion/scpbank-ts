import { useId, useState } from "react"

export default function BudgetPlan() {
  const id = useId()
  // default state for expense/income toggle
  const [isExpense, setIsExpense] = useState(true)

  function handleFormAction(formData: FormData) {
    const spendingType = String(formData.get("spending-type"))
    const amount = Number(formData.get("amount"))
    console.log({ spendingType, amount })
  }

  return (
    <section className="mx-32 my-6 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-bol text-4xl">
        SmartBudget: Track Your Income & Expenses with Ease
      </h1>
      <p className="text-center text-lg">
        Log your income and expenses, visualize where your money goes with
        dynamic charts, and get real-time summaries. <br />
        No clutter. No complexity. Just your money, clearly organized.
      </p>

      <div>
        <form
          className="flex flex-col gap-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
          action={handleFormAction}
        >
          <h3 className="text-2xl font-bold text-lime-700">
            Add your spending here!
          </h3>

          <fieldset className="flex items-center gap-8 rounded-2xl border border-green-700 p-2">
            <legend className="text-xl font-bold text-lime-700">
              Spending Type
            </legend>
            <label className="text-lg font-medium text-lime-800">
              <input
                type="radio"
                name="spending-type"
                value="expense"
                className="grow-1 bg-lime-200 px-4 py-1 text-xl accent-green-700 placeholder:text-gray-700"
                defaultChecked
                onClick={() => setIsExpense(true)}
              />
              Expense
            </label>
            <label className="text-lg font-medium text-lime-800">
              <input
                type="radio"
                name="spending-type"
                value="income"
                className="grow-1 bg-lime-200 px-4 py-1 text-xl accent-green-700 placeholder:text-gray-700"
                onClick={() => setIsExpense(false)}
              />
              Income
            </label>
          </fieldset>

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
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
