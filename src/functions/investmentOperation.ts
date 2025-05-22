import type { FinnhubSymbolRaw, SavedSymbol } from "@/lib/types"
import { supabase } from "@/supabase-client"
import type { User } from "@supabase/supabase-js"

export async function addStockToDatabase(
  user: User,
  symbol: string,
  amount: number,
  entryPrice: number,
  setError: (error: string) => void,
) {
  try {
    if (user) {
      const { error } = await supabase.from("investments").insert({
        symbol,
        amount_usd: amount,
        entry_price: entryPrice,
        user_id: user.id,
        created_at: new Date().toISOString(),
      })

      if (error) {
        throw new Error(error.message)
      }
      console.log("stock recorded")
    }
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    }
  }
}

type FetchStockSymbolsProps = {
  setStockSymbols: (stockSymbols: SavedSymbol[]) => void
}
export async function fetchStockSymbols({
  setStockSymbols,
}: FetchStockSymbolsProps) {
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
