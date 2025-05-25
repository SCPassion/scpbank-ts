export default function ExpenseCategory({ id }: { id: string }) {
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
      </select>
    </div>
  )
}
