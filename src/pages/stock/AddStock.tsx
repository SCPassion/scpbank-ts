import type { FinnhubSymbolRaw, SavedSymbol } from "@/lib/types"
import { useEffect, useState } from "react"

export default function AddStock() {
  const [stockSymbols, setStockSymbols] = useState<SavedSymbol[] | null>(null)

  useEffect(() => {
    fetchStockSymbols()
  }, [])

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

  console.log(stockSymbols)
  return <h1>hi</h1>
}
