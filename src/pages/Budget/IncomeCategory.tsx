export default function IncomeCategory({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-8">
      <label
        htmlFor={`${id}-income-category`}
        className="text-xl font-bold text-lime-700"
      >
        Category:
      </label>
      <select
        id={`${id}-income-category`}
        name="income-category"
        className="w-full bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
        required
        defaultValue={""}
      >
        <option value="" disabled>
          -- Choose an income category
        </option>
        {children}
      </select>
    </div>
  )
}
