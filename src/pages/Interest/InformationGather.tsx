import { useId } from "react"

export default function InformationGather() {
  const id = useId()
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-8 py-8 text-center">
      <h2 className="font-bol text-4xl">
        Investment comes with a lot of uncertainty. <br />
        But you can make it easier!
      </h2>
      <p>
        You can use this tool to predict your investment growth over time. This
        will help you make informed decisions about your investments and
        financial goals. You can also use this tool to compare different
        investment options and see which one is best for you.
      </p>

      <form className="hover:border-lime-00 flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl">
        <h3 className="text-3xl font-bold text-lime-800">
          Set up your investment calculation now!
        </h3>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-pa`}
            className="text-xl font-bold text-lime-700"
          >
            Principal Amount in USD (Initial lump sum invested)
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="number"
            placeholder="0"
            name="pa"
            id={`${id}-pa`}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-apr`}
            className="text-xl font-bold text-lime-700"
          >
            Expected Annual Interest Rate (%)
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="number"
            placeholder="5"
            name="apr"
            id={`${id}-apr`}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-years`}
            className="text-xl font-bold text-lime-700"
          >
            Time (Years), Total investment duration
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="number"
            placeholder="10"
            name="years"
            id={`${id}-years`}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor={`${id}-durationInWeeks`}
            className="text-xl font-bold text-lime-700"
          >
            Contribution Amount (Monthly), Amount added each month
          </label>
          <input
            className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
            type="number"
            placeholder="100"
            name="durationInWeeks"
            id={`${id}-durationInWeeks`}
            required
          />
        </div>

        <button className="cursor-pointer rounded-full bg-lime-800 px-7 py-4 font-bold text-white opacity-50 shadow-lg transition-all duration-300 hover:opacity-100">
          Predict your investment growth now!
        </button>
      </form>
      <p>Note: Interest are default to compound monthly</p>
    </div>
  )
}
