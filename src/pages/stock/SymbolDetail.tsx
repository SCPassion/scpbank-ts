import { Link, useParams, useNavigate } from "react-router"
import { IoReturnUpBack } from "react-icons/io5"
import { usePriceDatasStore, useUserStore } from "@/store/store"
import { useId, useState } from "react"
import { UpdateInvestment } from "@/functions/investmentOperation"

export default function SymbolDetail() {
  const id = useId()
  const [modelOpen, setModelOpen] = useState(false)
  const { user } = useUserStore()
  const { priceDatas } = usePriceDatasStore()
  const { symbol } = useParams<{ symbol: string }>()
  const symbolData = priceDatas?.find((data) => data.symbol === symbol)
  const navigate = useNavigate()

  function handleFormAction(formData: FormData) {
    const totalInvestment = Number(formData.get("total_investment"))
    const entryPrice = Number(formData.get("entry_price"))

    if (symbolData) {
      UpdateInvestment(user, symbolData.symbol, entryPrice, totalInvestment)
      navigate("..", { replace: true, relative: "path" })
    }
  }

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
              <p className="text-xl font-bold text-lime-700">Symbol name: </p>
              <p>{symbolData.symbol}</p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">Current Price: </p>
              <p>${symbolData.current_price}</p>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">
                Percent Change:{" "}
              </p>
              <p>{symbolData.percent_change}</p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">Highest Price: </p>
              <p>${symbolData.highest_price}</p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">Lowest Price: </p>
              <p>${symbolData.lowest_price}</p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">Open Price: </p>
              <p>${symbolData.open_price}</p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">
                Previous Close:{" "}
              </p>
              <p>${symbolData.previous_close}</p>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl font-bold text-lime-700">
                Change in 24hr:{" "}
              </p>
              <p>${symbolData.change}</p>
            </div>
          </section>
          <h2 className="mt-8 mb-4 text-center text-2xl font-bold">
            Your Investment Details
          </h2>

          <section className="mx-auto flex w-5/12 justify-center gap-8 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold text-lime-700">Entry Price: </p>
              <p className="text-center">${symbolData.entry_price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold text-lime-700">
                Total Investment:{" "}
              </p>
              <p className="text-center">${symbolData.total_investment}</p>
            </div>
          </section>

          <div className="mt-6 flex flex-col items-center">
            <button
              className="w-5/12 cursor-pointer rounded-2xl bg-green-700 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-900"
              onClick={() => setModelOpen(true)}
            >
              Want to update your Investement?
            </button>
          </div>

          {modelOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,24,39,0.5)]">
              <form
                className="space-y-4 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
                action={handleFormAction}
              >
                <div className="flex gap-4">
                  <label
                    htmlFor={`${id}-entry`}
                    className="text-xl font-bold text-lime-700"
                  >
                    New entry price:{" "}
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
                    id={`${id}-entry`}
                    required
                    name="entry_price"
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
                    placeholder="100"
                    className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
                    id={`${id}-total`}
                    required
                    name="total_investment"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
                >
                  Update Investment
                </button>
                <button
                  type="button"
                  className="w-full cursor-pointer rounded-2xl bg-red-600 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-red-700"
                  onClick={() => setModelOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
