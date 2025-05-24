import { Link, useParams } from "react-router"
import { IoReturnUpBack } from "react-icons/io5"
import { usePriceDatasStore } from "@/store/store"
import { useId } from "react"

export default function SymbolDetail() {
  const id = useId()
  const { priceDatas } = usePriceDatasStore()
  const { symbol } = useParams<{ symbol: string }>()
  const symbolData = priceDatas?.find((data) => data.symbol === symbol)
  console.log("Symbol Data:", symbolData)

  return (
    <div className="px-8 py-4">
      <Link
        to=".."
        relative="path"
        className="flex items-center gap-4 text-green-700 underline"
      >
        <IoReturnUpBack />
        Back to Portfolio
      </Link>
      {symbolData && (
        <div>
          <h2 className="mb-4 text-center text-2xl font-bold">
            Symbol Details
          </h2>
          <section className="grid grid-cols-3 grid-rows-3 gap-4 space-y-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">Symbol name: </h1>
              <h1>{symbolData.symbol}</h1>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">
                Current Price:{" "}
              </h1>
              <h1>${symbolData.current_price}</h1>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">
                Percent Change:{" "}
              </h1>
              <h1>{symbolData.percent_change}</h1>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">
                Highest Price:{" "}
              </h1>
              <h1>${symbolData.highest_price}</h1>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">
                Lowest Price:{" "}
              </h1>
              <h1>${symbolData.lowest_price}</h1>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">Open Price: </h1>
              <h1>${symbolData.open_price}</h1>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">
                Previous Close:{" "}
              </h1>
              <h1>${symbolData.previous_close}</h1>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-xl font-bold text-lime-700">
                Change in 24hr:{" "}
              </h1>
              <h1>${symbolData.change}</h1>
            </div>
          </section>
          <h2 className="mt-8 mb-4 text-center text-2xl font-bold">
            Your Investment Details
          </h2>
          <section className="flex justify-center gap-8">
            <div className="flex flex-col gap-2">
              <h1>Entry Price: </h1>
              <h1>{symbolData.entry_price}</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Total Investment: </h1>
              <h1>{symbolData.total_investment}</h1>
            </div>
          </section>

          <div className="mt-6 flex flex-col items-center">
            <button className="mb-4 cursor-pointer rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800">
              Want to update your Investement?
            </button>
            <form className="space-y-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl">
              <div className="flex gap-4">
                <label
                  htmlFor={`${id}-entry`}
                  className="text-xl font-bold text-lime-700"
                >
                  New entry price:{" "}
                </label>
                <input
                  type="number"
                  placeholder="New Entry Price"
                  className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
                  defaultValue={symbolData.entry_price}
                  id={`${id}-entry`}
                  required
                />
              </div>
              <div className="flex gap-4">
                <label
                  htmlFor={`${id}-total`}
                  className="text-xl font-bold text-lime-700"
                >
                  New total invesement:{" "}
                </label>
                <input
                  type="number"
                  placeholder="New Total Investment"
                  className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
                  defaultValue={symbolData.total_investment}
                  id={`${id}-total`}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
              >
                Update Investment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
