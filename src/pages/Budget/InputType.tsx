type InputTypeProps = {
  setIsExpense: (isExpense: boolean) => void
}

export default function InputType({ setIsExpense }: InputTypeProps) {
  return (
    <fieldset className="flex items-center gap-8 rounded-2xl border border-green-700 p-3">
      <legend className="text-xl font-bold text-lime-700">Category Type</legend>
      <label className="text-lg font-medium text-lime-800">
        <input
          type="radio"
          name="type"
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
          name="type"
          value="income"
          className="grow-1 bg-lime-200 px-4 py-1 text-xl accent-green-700 placeholder:text-gray-700"
          onClick={() => setIsExpense(false)}
        />
        Income
      </label>
    </fieldset>
  )
}
