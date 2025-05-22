import type { FinnhubSymbolRaw, SavedSymbol } from "@/lib/types"
import { useEffect, useState, useId } from "react"
import { FaRotate } from "react-icons/fa6"

export default function AddStock() {
  const id = useId()
  const [stockSymbols, setStockSymbols] = useState<SavedSymbol[] | null>(null)
  const [query, setQuery] = useState<string>("")
  const [matches, setMatches] = useState<SavedSymbol[]>([])
  const [debouncedQuery, setDebouncedQuery] = useState<string>("")

  // This is used to gather all the stock symbols from the API
  // and store them in the stockSymbols state
  useEffect(() => {
    fetchStockSymbols()
  }, [])

  // This makes sure the query is check once the user stops typing for 500ms
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timeOut)
  }, [query])

  // This effect is used to filter the stock symbols based on user input.
  // Runs when there is a change in the query or stockSymbols
  useEffect(() => {
    if (!debouncedQuery) {
      setMatches([])
      return
    }
    const q = debouncedQuery.toLowerCase()

    if (stockSymbols) {
      // Filter the stock symbols based on the query
      const filtered = stockSymbols.filter(
        (item) =>
          item.symbol.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      )

      // Limit the number of matches to 10
      setMatches(filtered.slice(0, 10))
    }
  }, [debouncedQuery, stockSymbols])

  async function fetchStockSymbols() {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data: FinnhubSymbolRaw[] = await response.json()

    const filtered: SavedSymbol[] = data.map((item: any) => ({
      symbol: item.symbol,
      description: item.description,
      type: item.type,
      currency: item.currency,
    }))

    setStockSymbols(filtered)
  }

  async function handleAction(formData: FormData) {
    const stockSymbol = formData.get("stock")
    const amount = formData.get("amount_usd")
    const entryPrice = formData.get("entry_price")

    if (stockSymbol === null || amount === null || entryPrice === null) {
      console.error("Invalid input")
      return
    }

    const stock = stockSymbols?.find(
      (item) => item.symbol === stockSymbol.toString(),
    )

    if (!stock) {
      console.error("Stock not found")
      return
    }

    // Here you can add the logic to save the stock to your database
    console.log("Stock added:", {
      symbol: stock.symbol,
      amount: Number(amount),
      entryPrice: Number(entryPrice),
    })
  }

  return (
    <div className="mx-32 my-6 flex flex-col items-center justify-center gap-6 text-center">
      <h2 className="font-bol text-4xl">
        Smart Portfolio Tracker — Track. Analyze. Decide.
      </h2>
      <p>
        Stay on top of your investments with real-time stock insights. <br />
        Add your holdings, monitor performance, and receive smart suggestions
        <br /> — whether you’re chasing the hype or buying the dip. No noise.
        Just numbers that matter.
      </p>
      <form
        className="rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl"
        action={handleAction}
      >
        {stockSymbols !== null ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex gap-8">
              <label
                htmlFor={`${id}-query`}
                className="text-xl font-bold text-lime-700"
              >
                Enter your stock symbol:
              </label>
              <input
                id={`${id}-query`}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stocks (e.g. AAPL, Tesla)"
                className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
                required
              />
            </div>
            <div className="flex gap-8">
              <label
                htmlFor={`${id}-stock`}
                className="text-xl font-bold text-lime-700"
              >
                Share your symbol here:
              </label>
              <select
                name="stock"
                id={`${id}-stock`}
                required
                className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
              >
                <option value="">--Select a stock --</option>
                {matches.map((item) => (
                  <option key={item.symbol} value={item.symbol}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-8">
              <label
                htmlFor={`${id}-totalamount`}
                className="text-xl font-bold text-lime-700"
              >
                Amount invested
              </label>
              <input
                type="number"
                name="amount_usd"
                placeholder="100"
                id={`${id}-totalamount`}
                className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
                required
              />
            </div>
            <div className="flex gap-8">
              <label
                htmlFor={`${id}-entryprice`}
                className="text-xl font-bold text-lime-700"
              >
                Entry price
              </label>

              <input
                type="number"
                name="entry_price"
                placeholder="10"
                id={`${id}-entryprice`}
                required
                className="grow-1 bg-lime-200 px-4 py-1 text-xl placeholder:text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer rounded-2xl bg-green-800 px-4 py-2 text-xl font-bold text-lime-100 duration-300 hover:bg-green-700"
            >
              Added you stock
            </button>
          </div>
        ) : (
          <FaRotate
            className="flex animate-spin items-center justify-center"
            size={40}
            fill="green"
            style={{ animationDuration: "2s" }}
          />
        )}
      </form>
    </div>
  )
}

// (
//         <FaRotate
//           className="animate-spin"
//           size={40}
//           fill="green"
//           style={{ animationDuration: "2s" }}
//         />
//       )
