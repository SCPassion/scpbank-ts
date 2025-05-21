import type { FinnhubSymbolRaw, SavedSymbol } from "@/lib/types"
import { useEffect, useState } from "react"

export default function AddStock() {
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
      "https://finnhub.io/api/v1/stock/symbol?exchange=US&token=d0n2c69r01qmjqmk8v00d0n2c69r01qmjqmk8v0g",
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

  return (
    <form className="mx-32 my-6 flex flex-col items-center justify-center gap-6 rounded-2xl border-4 border-green-500 bg-lime-100 p-8 shadow-lg duration-300 hover:border-8 hover:border-lime-800 hover:shadow-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stocks (e.g. AAPL, Tesla)"
      />

      <select name="stock">
        <option value="">--Select a stock --</option>
        {matches.map((item) => (
          <option key={item.symbol} value={item.symbol}>
            {item.description}
          </option>
        ))}
      </select>
    </form>
  )
}
