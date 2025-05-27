import { useId } from "react"

export default function ExpenseCategory({
  children,
}: {
  children: React.ReactNode
}) {
  const id = useId()

  return (
    <div className="flex items-center gap-8">
      <label
        htmlFor={`${id}-expense-category`}
        className="text-xl font-bold text-lime-700"
      >
        Category:
      </label>
      <select
        id={`${id}-expense-category`}
        name="expense-category"
        className="w-full bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
        defaultValue={""}
        required
      >
        <option value="" disabled>
          -- Choose an expense category
        </option>
        {children}
      </select>
    </div>
  )
}
