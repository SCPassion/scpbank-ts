import type {
  FinnhubQuote,
  FinnhubSymbolRaw,
  Portfolio,
  PriceData,
  SavedSymbol,
} from "@/lib/types"
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
        console.error("Error inserting stock into database:", error)
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

export async function fetchPortfolio(
  user: User,
  setPortfolio: (portfolio: Portfolio[]) => void,
) {
  if (!user) return
  const { data, error } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching portfolio data:", error)
    return
  }
  if (!data) {
    console.log("No portfolio data found")
    return
  }
  setPortfolio(data)
}

export async function fetchPortfolioPrice(
  portfolio: Portfolio[],
  setPriceDatas: (priceData: PriceData[]) => void,
) {
  const promisesArray: Promise<Response>[] = portfolio.map((item) =>
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${item.symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
    ),
  )
  const responses: Response[] = await Promise.all(promisesArray)
  const data: FinnhubQuote[] = await Promise.all(
    responses.map((res) => res.json()),
  )
  const priceData: PriceData[] = data.map((item, index) => ({
    symbol: portfolio[index].symbol,
    current_price: item.c,
    highest_price: item.h,
    lowest_price: item.l,
    open_price: item.o,
    previous_close: item.pc,
    change: item.d,
    percent_change: item.dp,
  }))
  setPriceDatas(priceData)
}
